import { createRouter } from '@tempo-sync/shared/lib';

import * as handlers from './auth.handlers';

import { apiKeyMiddleware } from '@/shared/middleware/api-key.middleware';
import type { AppEnv } from '@/shared/types';

const auth = createRouter<AppEnv>()
  .get('/login', apiKeyMiddleware, handlers.login)
  .get('/callback/spotify', handlers.spotifyCallback)
  .get('/callback/strava', handlers.stravaCallback);

export { auth };
