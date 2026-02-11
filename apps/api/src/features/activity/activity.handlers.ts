import { activity, activityMap, activitySummary, eq, track } from '@tempo-sync/db';
import type {
  MultiValidatedContext,
  ParamQueryValidatedContext,
  ValidatedContext,
} from '@tempo-sync/shared/types';

import type {
  ActivityHighlightsValidation,
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
      elapsedTime: activitySummary.elapsedTime,
    })
    .from(activitySummary)
    .where(eq(activitySummary.activityId, id));

  const [{ startDate }] = await db
    .select({ startDate: activity.startDate })
    .from(activity)
    .where(eq(activity.id, id));

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

    const activityEndTime = new Date(startDate.getTime() + data.elapsedTime * 1000);

    const tracksDuration = tracks
      .map((track, index) => {
        if (index === tracks.length - 1) {
          return Math.floor(Math.abs(activityEndTime.getTime() - track.playedAt.getTime()) / 60000);
        }
        const nextTrack = tracks[index + 1];

        return Math.floor(
          Math.abs(nextTrack.playedAt.getTime() - track.playedAt.getTime()) / 60000
        );
      })
      .filter(Boolean);

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

  const [{ recommendations: allResults }] = await db
    .select({ recommendations: activity.llmTrackRecommendations })
    .from(activity)
    .where(eq(activity.id, id));

  if (!allResults || allResults.length === 0) {
    return c.json({
      recommendations: [],
      pagination: { hasMore: false, nextPage: null, page, total: 0 },
    });
  }

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

export const getActivityHighlights = async (
  c: ValidatedContext<ActivityHighlightsValidation, 'param', AppEnv>
) => {
  const { id } = c.req.valid('param');
  const db = c.get('db');

  const [activityData] = await db
    .select({
      bestEfforts: activity.bestEfforts,
      gear: activity.gear,
    })
    .from(activity)
    .where(eq(activity.id, id));

  const [summaryData] = await db
    .select({
      maxHeartrate: activitySummary.maxHeartrate,
      maxSpeed: activitySummary.maxSpeed,
      elevHigh: activitySummary.elevHigh,
      elevLow: activitySummary.elevLow,
    })
    .from(activitySummary)
    .where(eq(activitySummary.activityId, id));

  return c.json({
    bestEfforts: activityData.bestEfforts ?? [],
    gear: activityData.gear ?? null,
    maxHeartrate: summaryData.maxHeartrate ?? null,
    maxSpeed: summaryData.maxSpeed ?? null,
    elevHigh: summaryData.elevHigh ?? null,
    elevLow: summaryData.elevLow ?? null,
  });
};
