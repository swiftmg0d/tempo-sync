import { SPOTIFY_API_URI, STRAVA_API_URI } from '../constants';
import { createCustomAPI } from './custom-axios';

export const spotifyAPI = createCustomAPI(SPOTIFY_API_URI);
export const stravaAPI = createCustomAPI(STRAVA_API_URI);
