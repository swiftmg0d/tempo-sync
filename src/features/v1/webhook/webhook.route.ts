import { Router } from 'express';
import { Request } from 'express';

import { WebhookRequestBody } from '@/types/request.type';

import { verifyToken } from '../token/token.service';
const router = Router();

router.post(
  '/',
  async (req: Request<unknown, unknown, WebhookRequestBody>, res) => {
    console.log(req.body);

    const { message, success } = await verifyToken('strava');

    console.log(message, success);
    res.json({
      message,
      success,
    });
  },
);

router.get('/', (req, res) => {
  const VERIFY_TOKEN = 'STRAVA';

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      console.log('chal', challenge, token, mode);
      res.json({ 'hub.challenge': challenge });
    } else {
      res.sendStatus(403);
    }
  }
});

export default router;
