import type { MultiValidatedContext, ValidatedContext } from '@tempo-sync/shared/types';

import type {
  ActivityLLMInsightsValidation,
  ActivityStreamsBodyValidation,
  ActivityStreamsParamsValidation,
  ActivitySummaryValidation,
  ActivityValidation,
} from './activity.schema';
import {
  getActivitiesSummaryStats,
  getActivitySummaryById,
  getAthleteActivities,
} from './activity.service';

import { activity, activityMap, activitySummary, eq } from '@tempo-sync/db';
import type { AppContext, AppEnv } from '@/shared/types/bindings';
import { aggregateActivityStreams } from './utils';

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

  return c.json([]);
};
