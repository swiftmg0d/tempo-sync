import type { AppEnv } from '@/shared/types/bindings';
import { createRouter } from '@tempo-sync/shared';
import * as handlers from './spotify.handlers';

const spotify = createRouter<AppEnv>();

spotify.get('/top-artist', handlers.getAthleteTopArtist);

export { spotify };
