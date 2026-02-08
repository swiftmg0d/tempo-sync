import {
  athleteQueries,
  tokenQueries,
  type TokenProvider,
  activity as activitySchema,
  activityMap,
  activitySummary,
  syncQueries,
  track,
} from '@tempo-sync/db';
import type { PoolDatabase } from '@tempo-sync/db/client';
import { generetePrompt, type PromptKeys } from '@tempo-sync/llm';
import {
  decrypt,
  encrypt,
  http,
  incrementDateBySeconds,
  RECCOBEATS_API_URL,
} from '@tempo-sync/shared';
import { DatabaseError } from '@tempo-sync/shared/errors';
import type {
  CombinedRefreshTokensRequestParams,
  LLMActivityInsightResponse,
  LLMEnv,
  StravaActivity,
  TokenResponse,
} from '@tempo-sync/shared/types';

import { webhookApi } from './api';
import { syncToken } from './lib';

import type { AudioAnalysisResponse } from '@/shared/types';
import type { Bindings } from '@/shared/types/bindings';
import type { StreamData } from '@/shared/types/strava';
import { velocityToPace } from '@/shared/utils';

export const resyncWithToken = async (
  provider: TokenProvider,
  request: CombinedRefreshTokensRequestParams,
  stravaId: number,
  db: PoolDatabase
) => {
  try {
    const findToken = tokenQueries.findTokenByProviderAndId(db);
    const findAthlete = athleteQueries.findAthleteByStravaId(db);

    const [{ id }] = await findAthlete({ stravaId });

    const [accessToken] = await findToken({ provider, id, type: 'access' });
    const [refreshToken] = await findToken({ provider, id, type: 'refresh' });

    if (accessToken.expiresAt && accessToken.expiresAt > new Date()) {
      return {
        message: `${provider} access token is still valid, no need to resync!`,
        result: decrypt(accessToken.value, request.key),
        success: true,
      };
    }

    const refreshedTokenData: TokenResponse = await syncToken(provider, {
      client_id: provider === 'spotify' ? request.client_id : request.strava_client_id,
      client_secret: provider === 'spotify' ? request.client_secret : request.strava_client_secret,
      grant_type: request.grant_type,
      refresh_token: decrypt(refreshToken.value, request.key),
    });

    const [updatedAccessToken] = await tokenQueries.updateTokenById({
      db,
      tokenData: {
        type: 'access',
        provider,
        value: encrypt(refreshedTokenData.access_token, request.key),
        expiresAt: incrementDateBySeconds(refreshedTokenData.expires_in),
      },
      id,
    });

    if (refreshedTokenData.refresh_token) {
      await tokenQueries.updateTokenById({
        db,
        tokenData: {
          type: 'refresh',
          provider,
          value: encrypt(refreshedTokenData.refresh_token, request.key),
        },
        id,
      });
    }

    return {
      message: `${provider} token resynced successfully!`,
      result: decrypt(updatedAccessToken.value, request.key),
      success: true,
    };
  } catch (e) {
    console.error('Error in resyncWithToken:', e);
    throw e;
  }
};

export const analyizeStravaActivityWithLLM = async (
  activity: StravaActivity,
  accessToken: string,
  LLMEnv: LLMEnv
) => {
  const response = await generetePrompt({
    env: LLMEnv,
    data: activity,
    prompt: 'stravaDescription' satisfies PromptKeys,
  });

  const splitedResponse = response.split('\n');

  const [title, description] = [splitedResponse[0], splitedResponse.slice(1).join('\n')];

  const updatedActivity = await webhookApi.strava.updateActivityById({
    stravaActivityId: activity.id.toString(),
    accessToken,
    data: {
      name: title,
      description,
    },
  });

  let activityInsight;

  if (updatedActivity.map.polyline !== '') {
    activityInsight = await generetePrompt<LLMActivityInsightResponse>({
      env: LLMEnv,
      data: activity,
      prompt: 'stravaInsight' satisfies PromptKeys,
    });
  }

  return {
    updatedActivity,
    activityInsight,
  };
};

export const saveActivity = async (
  activity: StravaActivity,
  db: PoolDatabase,
  activityStreams: StreamData,
  activityInsight?: LLMActivityInsightResponse
) => {
  try {
    const findAthlete = athleteQueries.findAthleteByStravaId(db);
    const [{ id: athleteId }] = await findAthlete({
      stravaId: activity.athlete.id,
    });

    return await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .insert(activitySchema)
        .values({
          activityId: activity.id,
          athleteId: athleteId,
          bestEfforts: activity.best_efforts,
          deviceName: activity.device_name,
          gear: activity.gear,
          laps: activity.laps,
          llmActivityInsight: activityInsight,
          name: activity.name,
          splitsMetric: activity.splits_metric,
          splitsStandard: activity.splits_standard,
          startDate: new Date(activity.start_date),
          startDateLocal: new Date(activity.start_date_local),
          type: activity.type,
        })
        .returning({ id: activitySchema.id });

      await tx.insert(activityMap).values({
        activityId: id,
        mapId: activity.map.id,
        polyline: activity.map.polyline,
        summaryPolyline: activity.map.summary_polyline,
      });

      await tx.insert(activitySummary).values({
        activityId: id,
        averageCadence: activity.average_cadence,
        averageHeartrate: activity.average_heartrate,
        averageSpeed: activity.average_speed,
        calories: activity.calories,
        distance: activity.distance,
        elapsedTime: activity.elapsed_time,
        elevHigh: activity.elev_high,
        elevLow: activity.elev_low,
        endLatlng: activity.end_latlng,
        hasHeartrate: activity.has_heartrate,
        maxHeartrate: activity.max_heartrate,
        maxSpeed: activity.max_speed,
        movingTime: activity.moving_time,
        startLatlng: activity.start_latlng,
        totalElevationGain: activity.total_elevation_gain,
        hearBeatData: activityStreams.heartrate.data,
        cadenceData: activityStreams.cadence.data,
        paceData: activityStreams.velocity_smooth.data.map((v) => velocityToPace(v)),
      });

      return id;
    });
  } catch (e) {
    console.error('Error while saving activity to the database:', e);
    throw new DatabaseError(500, 'Error occurred while saving activity');
  }
};

export const handleStravaWebhook = async ({
  db,
  activity,
  accessToken,
  env,
}: {
  db: PoolDatabase;
  activity: StravaActivity;
  accessToken: string;
  env: Bindings;
}) => {
  try {
    const activityStreams = await webhookApi.strava.getActivityStreams({
      stravaActivityId: activity.id.toString(),
      accessToken,
    });

    const LLMEnv: LLMEnv = {
      GEMINI_API_KEY: env.GEMINI_API_KEY,
      GROQ_API_KEY: env.GROQ_API_KEY,
      OPENROUTER_API_KEY: env.OPENROUTER_API_KEY,
      CEREBRAS_API_KEY: env.CEREBRAS_API_KEY,
      SAMBANOVA_API_KEY: env.SAMBANOVA_API_KEY,
    };

    const { updatedActivity, activityInsight } = await analyizeStravaActivityWithLLM(
      activity,
      accessToken,
      LLMEnv
    );

    const id = await saveActivity(updatedActivity, db, activityStreams, activityInsight);

    await syncQueries.updateLastSyncTime(db, new Date());

    return id;
  } catch (e) {
    console.error('Error while handling Strava webhook:', e);
    throw new DatabaseError(500, 'Failed to handle Strava webhook event');
  }
};

export const getRecentlyPlayedSongsDuringActivity = async ({
  activityId,
  accessToken,
  startDate,
  // endDate,
  db,
}: {
  activityId: string;
  accessToken: string;
  startDate: Date;
  endDate: Date;
  db: PoolDatabase;
}) => {
  try {
    const data = await webhookApi.spotify.fetchRecentlyPlayedTracks({
      accessToken: accessToken,
      after: Math.floor(startDate.getTime()),
    });

    // *  Spotify's recently played tracks endpoint returns tracks in reverse chronological order,
    // *  so we can stop fetching more tracks as soon as we encounter a track that was played before the activity start time.
    // !  REMOVE THIS COMMENT AFTER IMPLEMENTING PAGINATION TO FETCH ALL RECENTLY PLAYED TRACKS DURING THE ACTIVITY

    // const filteredItems = data.items.filter(
    //   (item) => new Date(item.played_at) >= startDate && new Date(item.played_at) <= endDate
    // );

    const middleLength = Math.ceil(data.items.length / 2);

    const firstBatch = data.items.slice(0, middleLength).map((item) => item.track.id);
    const secondBatch = data.items
      .slice(middleLength, data.items.length)
      .map((item) => item.track.id);

    const firstBatchResponse = await http<{ content: AudioAnalysisResponse[] }>(
      `${RECCOBEATS_API_URL}/audio-features?ids=${firstBatch.join(',')}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const secondBatchResponse = await http<{ content: AudioAnalysisResponse[] }>(
      `${RECCOBEATS_API_URL}/audio-features?ids=${secondBatch.join(',')}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const combinedAudioAnalysis: AudioAnalysisResponse[] = [
      ...(Array.isArray(firstBatchResponse.content)
        ? firstBatchResponse.content
        : [firstBatchResponse.content]),
      ...(Array.isArray(secondBatchResponse.content)
        ? secondBatchResponse.content
        : [secondBatchResponse.content]),
    ];

    await db.transaction(async (tx) => {
      for (const item of data.items) {
        const audioAnalysis = combinedAudioAnalysis.find(
          (analysis) => analysis.href === item.track.external_urls.spotify
        );

        console.log('Audio analysis for track', item.track.name, ':', audioAnalysis);

        await tx.insert(track).values({
          activityId,
          trackId: item.track.id,
          name: item.track.name,
          durationMs: parseInt(item.track.duration_ms.toString(), 0),
          spotifyUrl: item.track.external_urls.spotify,
          artists: item.track.artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
            href: artist.external_urls.spotify,
          })),
          images: item.track.album.images.map((image) => ({
            url: image.url,
            height: image.height,
            width: image.width,
          })),
          playedAt: new Date(item.played_at),
          acousticness: audioAnalysis?.acousticness,
          danceability: audioAnalysis?.danceability,
          energy: audioAnalysis?.energy,
          instrumentalness: audioAnalysis?.instrumentalness,
          key: audioAnalysis?.key,
          liveness: audioAnalysis?.liveness,
          loudness: audioAnalysis?.loudness,
          mode: audioAnalysis?.mode,
          speechiness: audioAnalysis?.speechiness,
          tempo: audioAnalysis?.tempo,
          valence: audioAnalysis?.valence,
        });
      }
    });
  } catch (e) {
    console.error('Error while fetching recently played tracks:', e);
    throw new DatabaseError(500, 'Failed to fetch recently played tracks during activity');
  }
};
