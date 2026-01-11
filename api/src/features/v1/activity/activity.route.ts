import { Router } from 'express';

import { validate } from '@/middleware/validate.middleware';

import { getActivities, getActivitySummary, getAllActivitiesSummary } from './activity.controller';
import { getActivitySummaryShema } from './activity.validation';

const router = Router();

router.get('/', getActivities);
router.get('/:id/summary', validate(getActivitySummaryShema), getActivitySummary);
router.get('/summaries', getAllActivitiesSummary);

export default router;
