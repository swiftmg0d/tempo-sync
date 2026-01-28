import { createRouter } from '@tempo-sync/shared/lib';
import { validate } from '@tempo-sync/shared/middleware';

import * as handlers from './activity.handlers';
import {
  activitySchema,
  getActivityLLMInsightsSchema,
  getActivitySummaryShema,
} from './activity.schema';

import type { AppEnv } from '@/shared/types/bindings';

const activity = createRouter<AppEnv>()
  .get('/', validate('query', activitySchema), handlers.getActivities)
  .get('/:id/summary', validate('param', getActivitySummaryShema), handlers.getActivitySummary)
  .get('/summary/overall', handlers.getOverallActivitySummary)
  .get('/polylines', handlers.getActivitiesPolylines)
  .get(
    '/:id/llm-insights',
    validate('param', getActivityLLMInsightsSchema),
    handlers.getActivityLLMInsights
  );

export { activity };
