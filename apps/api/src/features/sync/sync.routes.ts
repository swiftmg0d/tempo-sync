import { createRouter } from '@tempo-sync/shared/lib';

import * as handlers from './sync.handlers';

import type { AppEnv } from '@/shared/types/bindings';

const sync = createRouter<AppEnv>().get('/status', handlers.getSyncStatus);

export { sync };
