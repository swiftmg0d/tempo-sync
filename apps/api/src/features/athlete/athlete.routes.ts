import type { AppEnv } from '@/shared/types/bindings';
import { createRouter } from '@tempo-sync/shared/lib';
import * as handlers from './athlete.handlers';

export const athlete = createRouter<AppEnv>().get('/', handlers.getAthlete);
