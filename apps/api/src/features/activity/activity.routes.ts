import { createRouter } from '@tempo-sync/shared/lib';
import { validate } from '@tempo-sync/shared/middleware';

import * as handlers from './activity.handlers';
import {
  activitySchema,
  getActivityLLMInsightsSchema,
  getActivityStreamsBodySchema,
  getActivityStreamsParamsSchema,
  getActivitySummarySchema,
} from './activity.schema';

import type { AppEnv } from '@/shared/types/bindings';

const activity = createRouter<AppEnv>()
  .get('/', validate('query', activitySchema), handlers.getActivities)
  .get('/:id/summary', validate('param', getActivitySummarySchema), handlers.getActivitySummary)
  .post(
    '/:id/streams',
    validate('param', getActivityStreamsParamsSchema),
    validate('json', getActivityStreamsBodySchema),
    handlers.getActivityStreams
  )

  .get(
    '/:id/llm-insights',
    validate('param', getActivityLLMInsightsSchema),
    handlers.getActivityLLMInsights
  )
  .get('/summary/overall', handlers.getOverallActivitySummary)
  .get('/polylines', handlers.getActivitiesPolylines);

export { activity };
