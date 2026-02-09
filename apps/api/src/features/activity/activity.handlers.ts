import { activity, activityMap, activitySummary, eq, track } from '@tempo-sync/db';
import { http, RECCOBEATS_API_URL, SPOTIFY_API_URL } from '@tempo-sync/shared';
import type {
  MultiValidatedContext,
  ParamQueryValidatedContext,
  TrackRecommendationsResponse,
  ValidatedContext,
} from '@tempo-sync/shared/types';

import type {
  ActivityLLMInsightsValidation,
  ActivityStreamsBodyValidation,
  ActivityStreamsParamsValidation,
  ActivitySummaryValidation,
  ActivityTrackLeaderboardValidation,
  ActivityTrackRecommendationsParamValidation,
  ActivityTrackRecommendationsQueryValidation,
  ActivityValidation,
} from './activity.schema';
import {
  getActivitiesSummaryStats,
  getActivitySummaryById,
  getAthleteActivities,
} from './activity.service';
import { aggregateActivityStreams } from './utils';

import { resetToken } from '@/shared/lib';
import type { AppContext, AppEnv } from '@/shared/types/bindings';

export const getActivities = async (c: ValidatedContext<ActivityValidation, 'query', AppEnv>) => {
  const db = c.get('db');

  const { page, limit } = c.req.valid('query');

  const activities = await getAthleteActivities(db, page, limit);

  return c.json(activities);
};

export const getActivitySummary = async (
  c: ValidatedContext<ActivitySummaryValidation, 'param', AppEnv>
) => {
  const { id } = c.req.valid('param');

  const db = c.get('db');

  const summary = await getActivitySummaryById(id, db);

  return c.json(summary);
};

export const getOverallActivitySummary = async (c: AppContext) => {
  const db = c.get('db');

  const summary = await getActivitiesSummaryStats(db);

  return c.json(summary);
};
export const getActivitiesPolylines = async (c: AppContext) => {
  const db = c.get('db');
  const maps = await db
    .select({
      polyline: activityMap.polyline,
      activityId: activityMap.activityId,
    })
    .from(activityMap);

  return c.json(maps);
};

export const getActivityLLMInsights = async (
  c: ValidatedContext<ActivityLLMInsightsValidation, 'param', AppEnv>
) => {
  const { id } = c.req.valid('param');

  const db = c.get('db');

  const [{ insight }] = await db
    .select({ insight: activity.llmActivityInsight })
    .from(activity)
    .where(eq(activity.id, id));

  return c.json(insight);
};

export const getActivityStreams = async (
  c: MultiValidatedContext<ActivityStreamsParamsValidation, ActivityStreamsBodyValidation, AppEnv>
) => {
  const { id } = c.req.valid('param');
  const { streamTypes } = c.req.valid('json');

  const db = c.get('db');

  const [data] = await db
    .select({
      activityId: activitySummary.id,
      hearBeatData: activitySummary.hearBeatData,
      cadenceData: activitySummary.cadenceData,
      paceData: activitySummary.paceData,
    })
    .from(activitySummary)
    .where(eq(activitySummary.activityId, id));

  if (streamTypes.includes('cadence') && streamTypes.includes('pace')) {
    if (!data.cadenceData || !data.paceData) {
      return c.json([]);
    }
    const aggregatedCadence = aggregateActivityStreams(data.cadenceData, 'cadence');
    const aggregatedPace = aggregateActivityStreams(data.paceData, 'pace');

    const combined = aggregatedCadence.map((item, i) => ({
      ...item,
      ...aggregatedPace[i],
    }));

    return c.json(combined);
  }

  if (streamTypes.includes('heartrate') && streamTypes.includes('tempo')) {
    const tracks = await db.select().from(track).where(eq(track.activityId, id));

    const tracksDuration = tracks
      .map((track, index) => {
        if (index === tracks.length - 1) {
          return;
        }
        const nextTrack = tracks[index + 1];

        return Math.floor(
          Math.abs(nextTrack.playedAt.getTime() - track.playedAt.getTime()) / 60000
        );
      })
      .filter((duration) => duration !== undefined);

    if (!data.hearBeatData) {
      return c.json([]);
    }

    const aggregatedHeartrate = aggregateActivityStreams(data.hearBeatData, 'heartrate');

    let tempoByMinute: (number | null)[] = [];
    tracksDuration.forEach((duration, index) => {
      const currentTrack = tracks[index];
      for (let i = 0; i < duration; i++) {
        tempoByMinute.push(currentTrack.tempo);
      }
    });

    // ! REMOVE THIS LATER - TO SHOW SOME DATA ON THE FRONTEND WHILE TESTING
    tempoByMinute = tempoByMinute.filter((tempo) => tempo !== null);

    const combined = aggregatedHeartrate.map((item, i) => ({
      ...item,
      tempo: tempoByMinute[i] ?? null,
    }));

    return c.json(combined);
  }

  return c.json([]);
};

export const getActivityTrackLeaderboard = async (
  c: ValidatedContext<ActivityTrackLeaderboardValidation, 'param', AppEnv>
) => {
  const { id } = c.req.valid('param');

  const db = c.get('db');

  const [{ leaderboard }] = await db
    .select({ leaderboard: activity.llmTrackLeaderboard })
    .from(activity)
    .where(eq(activity.id, id))
    .limit(3);

  return c.json(leaderboard?.slice(0, 3) ?? []);
};

export const getActivityTrackRecommendations = async (
  c: ParamQueryValidatedContext<
    ActivityTrackRecommendationsParamValidation,
    ActivityTrackRecommendationsQueryValidation,
    AppEnv
  >
) => {
  const { id } = c.req.valid('param');
  const { page, limit } = c.req.valid('query');

  const db = c.get('db');

  const [{ leaderboard }] = await db
    .select({ leaderboard: activity.llmTrackLeaderboard })
    .from(activity)
    .where(eq(activity.id, id));

  if (!leaderboard || leaderboard.length === 0) {
    return c.json({
      recommendations: [],
      pagination: { hasMore: false, nextPage: null, page, total: 0 },
    });
  }

  const seedIds = leaderboard
    .slice(0, 5)
    .map((entry) => entry.trackId)
    .filter(Boolean) as string[];

  if (seedIds.length === 0) {
    return c.json({
      recommendations: [],
      pagination: { hasMore: false, nextPage: null, page, total: 0 },
    });
  }

  const tracks = await db.select().from(track).where(eq(track.activityId, id));

  const seedTracks = tracks.filter((t) => seedIds.includes(t.trackId));

  const avg = (values: (number | null)[]) => {
    const valid = values.filter((v): v is number => v !== null);
    return valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : undefined;
  };

  const avgEnergy = avg(seedTracks.map((t) => t.energy));
  const avgDanceability = avg(seedTracks.map((t) => t.danceability));
  const avgTempo = avg(seedTracks.map((t) => t.tempo));
  const avgValence = avg(seedTracks.map((t) => t.valence));

  const params = new URLSearchParams({
    size: '20',
    seeds: seedIds.join(','),
  });

  if (avgEnergy !== undefined) params.set('energy', avgEnergy.toFixed(2));
  if (avgDanceability !== undefined) params.set('danceability', avgDanceability.toFixed(2));
  if (avgTempo !== undefined) params.set('tempo', avgTempo.toFixed(2));
  if (avgValence !== undefined) params.set('valence', avgValence.toFixed(2));

  const recommendations = await http<{ content: TrackRecommendationsResponse }>(
    `${RECCOBEATS_API_URL}/track/recommendation?${params.toString()}`,
    { method: 'GET' }
  );

  const accessToken = await resetToken({ db, env: c.env, provider: 'spotify' });

  const allResults = await Promise.all(
    recommendations.content.map(async (track) => {
      const trackId = /[a-zA-Z0-9]{22}/.exec(track.href)?.[0];

      const response = await http<{
        album: { images: { url: string }[] };
      }>(`${SPOTIFY_API_URL}/tracks/${trackId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        ...track,
        image: response.album.images[2]?.url ?? '',
      };
    })
  );

  const total = allResults.length;
  const start = (page - 1) * limit;
  const paginatedResults = allResults.slice(start, start + limit);
  const hasMore = start + limit < total;

  return c.json({
    recommendations: paginatedResults,
    pagination: {
      hasMore,
      nextPage: hasMore ? page + 1 : null,
      page,
      total,
    },
  });
};
