import {
  athleteQueries,
  tokenQueries,
  type TokenProvider,
  activity as activitySchema,
  activityMap,
  activitySummary,
} from '@tempo-sync/db';
import type { PoolDatabase } from '@tempo-sync/db/client';
import { generetePrompt, type PromptKeys } from '@tempo-sync/llm';
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
import { decrypt, encrypt, incrementDateBySeconds } from '@tempo-sync/shared';

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
    activityId: activity.id.toString(),
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
  activityInsight?: LLMActivityInsightResponse
) => {
  try {
    const findAthlete = athleteQueries.findAthleteByStravaId(db);
    const [{ id: athleteId }] = await findAthlete({
      stravaId: activity.athlete.id,
    });

    return db.transaction(async (tx) => {
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
          llmHeartBeatSongsAnalaysis: null,
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
      });

      return {
        message: 'Successfully saved activity!',
        success: true,
      };
    });
  } catch (e) {
    console.error(e);
    throw new DatabaseError(500, 'Error occurred while saving activity');
  }
};
