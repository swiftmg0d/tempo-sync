import { createRouter } from '@tempo-sync/shared/lib';

import * as handlers from './athlete.handlers';

import type { AppEnv } from '@/shared/types/bindings';

export const athlete = createRouter<AppEnv>()
  .get('/', handlers.getAthlete)
  .get('/profiles', handlers.getProfiles);
