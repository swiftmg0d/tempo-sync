import dotenv from 'dotenv';

import { SPOTIFY_AUTH_URI, STRAVA_AUTH_URI } from '@/config/constants';
import { AuthType } from '@/types/auth.type';

dotenv.config();

const {
  CLIENT_ID,
  REDIRECT_URI,
  REDIRECT_URI_STRAVA,
  SCOPE,
  STRAVA_CLIENT_ID,
} = process.env;

export const getAuthUrl = (type: AuthType) => {
  const state = Math.random().toString(36).substring(2, 18);

  const authUrls = {
    spotify:
      SPOTIFY_AUTH_URI +
      `response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&state=${state}`,
    strava:
      STRAVA_AUTH_URI +
      `client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI_STRAVA}&approval_prompt=force&scope=read`,
  };

  return authUrls[type];
};
