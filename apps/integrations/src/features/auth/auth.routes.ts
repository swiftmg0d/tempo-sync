import { apiKeyMiddleware } from '@/shared/middleware/api-key.middleware';
import * as handlers from './auth.handlers';
import type { AppEnv } from '@/shared/types';
import { createRouter } from '@tempo-sync/shared/lib';

const auth = createRouter<AppEnv>()
  .get('/login', apiKeyMiddleware, handlers.login)
  .get('/callback/spotify', handlers.spotifyCallback)
  .get('/callback/strava', handlers.stravaCallback);

export { auth };
