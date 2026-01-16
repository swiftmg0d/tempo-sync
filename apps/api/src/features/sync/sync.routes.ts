import type { AppEnv } from '@/shared/types/bindings';
import { createRouter } from '@tempo-sync/shared/lib';
import * as handlers from './sync.handlers';

const sync = createRouter<AppEnv>().get('/status', handlers.getSyncStatus);

export { sync };
