import { activity, activityMap, activitySummary, eq, track } from '@tempo-sync/db';
import type { MultiValidatedContext, ValidatedContext } from '@tempo-sync/shared/types';

import type {
  ActivityLLMInsightsValidation,
  ActivityStreamsBodyValidation,
  ActivityStreamsParamsValidation,
  ActivitySummaryValidation,
  ActivityTrackLeaderboardValidation,
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
