import { Router } from 'express';

import {
  deleteWebhook,
  registerWebhook,
  stravaWebhookResponse,
  verifyStravaWebhook,
  viewWebhook,
} from './webhook.controller';

const router = Router();

router.post('/register', registerWebhook);
router.get('/view', viewWebhook);
router.delete('/delete/:id', deleteWebhook);
router.post('/', stravaWebhookResponse);
router.get('/', verifyStravaWebhook);

export default router;
