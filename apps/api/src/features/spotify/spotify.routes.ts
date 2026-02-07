import { createRouter } from '@tempo-sync/shared';

import * as handlers from './spotify.handlers';

import type { AppEnv } from '@/shared/types/bindings';

const spotify = createRouter<AppEnv>();

spotify.get('/top-artist', handlers.getAthleteTopArtist);

export { spotify };
