import { SPOTIFY_API_URL, STRAVA_API_URL } from '@/constants';

import { createCustomAPI } from './custom-axios';

export const spotifyAPI = createCustomAPI(SPOTIFY_API_URL);
export const stravaAPI = createCustomAPI(STRAVA_API_URL);
