import type { ValidatedContext } from '@tempo-sync/shared/types';

import type {
  ActivityLLMInsightsValidation,
  ActivitySummaryValidation,
  ActivityValidation,
} from './activity.schema';
import {
  getActivitiesSummaryStats,
  getActivitySummaryById,
  getAthleteActivities,
} from './activity.service';

import type { AppContext, AppEnv } from '@/shared/types/bindings';
import { activity, activityMap, eq } from '@tempo-sync/db';

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

export async function getActivityLLMInsights(
  c: ValidatedContext<ActivityLLMInsightsValidation, 'param', AppEnv>
) {
  const { id } = c.req.valid('param');

  const db = c.get('db');

  const [{ insight }] = await db
    .select({ insight: activity.llmActivityInsight })
    .from(activity)
    .where(eq(activity.id, id));

  return c.json(insight);
}
