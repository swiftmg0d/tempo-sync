import dotenv from 'dotenv';

dotenv.config({});

const { CLIENT_ID, CLIENT_SECRET } = process.env;

export const SPOTIFY_AUTH_URI = 'https://accounts.spotify.com/authorize?';
export const SPOTFIY_TOKEN_URI = 'https://accounts.spotify.com/api/token';
export const STRAVA_AUTH_URI = 'http://www.strava.com/oauth/authorize?';
export const STRAVA_TOKEN_URI = 'https://www.strava.com/oauth/token';
export const STRAVA_API_URI = 'https://www.strava.com/api/v3';
export const SPOTIFY_API_URI = 'https://api.spotify.com/v1';
export const SPOTIFY_AUTH_HEADER = `Basic ${Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')}`;
