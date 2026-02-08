export const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';
export const SPOTFIY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const STRAVA_API_URL = 'https://www.strava.com/api/v3';
export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_AUTH_HEADER = (CLIENT_ID: string, CLIENT_SECRET: string) =>
  `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`;
export const RECCOBEATS_API_URL = 'https://api.reccobeats.com/v1';
