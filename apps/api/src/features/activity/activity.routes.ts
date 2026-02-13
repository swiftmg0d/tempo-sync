import { createRouter } from '@tempo-sync/shared/lib';
import { validate } from '@tempo-sync/shared/middleware';

import * as handlers from './activity.handlers';
import {
  activitySchema,
  getActivityHighlightsSchema,
  getActivityLLMInsightsSchema,
  getActivityStreamsBodySchema,
  getActivityStreamsParamsSchema,
  getActivitySummarySchema,
  getActivityTrackLeaderboardSchema,
  getActivityTrackRecommendationsParamSchema,
  getActivityTrackRecommendationsQuerySchema,
} from './activity.schema';

import type { AppEnv } from '@/shared/types/bindings';

const activity = createRouter<AppEnv>()
  .get('/', validate('query', activitySchema), handlers.getActivities)
  .get('/summary/overall', handlers.getOverallActivitySummary)
  .get('/polylines', handlers.getActivitiesPolylines)
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
  .get(
    '/:id/track-leaderboard',
    validate('param', getActivityTrackLeaderboardSchema),
    handlers.getActivityTrackLeaderboard
  )
  .get(
    '/:id/track-recommendations',
    validate('param', getActivityTrackRecommendationsParamSchema),
    validate('query', getActivityTrackRecommendationsQuerySchema),
    handlers.getActivityTrackRecommendations
  )
  .get(
    '/:id/highlights',
    validate('param', getActivityHighlightsSchema),
    handlers.getActivityHighlights
  );

export { activity };
