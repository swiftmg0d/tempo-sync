import { createRouter } from '@tempo-sync/shared/lib';
import * as handlers from './activity.handlers';
import type { AppEnv } from '@/shared/types/bindings';
import { validate } from '@tempo-sync/shared/middleware';
import { activitySchema, getActivitySummaryShema } from './activity.schema';

const activity = createRouter<AppEnv>()
  .get('/', validate('query', activitySchema), handlers.getActivities)
  .get(
    '/:id/summary',
    validate('param', getActivitySummaryShema),
    handlers.getActivitySummary
  )
  .get('/summary/overall', handlers.getOverallActivitySummary);

export { activity };
