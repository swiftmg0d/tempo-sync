import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  res.json('Recived').status(200);
});

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
