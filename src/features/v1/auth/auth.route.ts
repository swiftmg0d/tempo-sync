import { Router } from 'express';

import { login, spotifyCallback, stravaCallback } from './auth.controller';

const router = Router();

router.get('/login', login);
router.get('/callback', stravaCallback);
router.get('/callback-spotify', spotifyCallback);

export default router;
