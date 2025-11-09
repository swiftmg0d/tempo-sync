import { Router } from 'express';

import { apiKeyMiddleware } from '@/middleware/api-key.middleware';

import { login, spotifyCallback, stravaCallback } from './auth.controller';

const router = Router();

router.get('/login', apiKeyMiddleware, login);
router.get('/callback', stravaCallback);
router.get('/callback-spotify', spotifyCallback);

export default router;
