import { createRouter } from '@tempo-sync/shared';

import * as handlers from './strava.handlers';

import type { AppEnv } from '@/shared/types/bindings';

const strava = createRouter<AppEnv>();

strava.get('/activities/count', handlers.getAllActivitesCount);

export { strava };
