import { getCookie, setCookie } from 'hono/cookie';

import { authApi } from './api';
import { saveProfile, syncProfileWithSpotify } from './auth.service';
import { getAuthUrl } from './utils';

import type { AppContext } from '@/shared/types';

export const login = (c: AppContext) => {
  return c.redirect(getAuthUrl('strava', c.env));
};

export const stravaCallback = async (c: AppContext) => {
  const code = c.req.query('code');

  const request = {
    client_id: c.env.STRAVA_CLIENT_ID,
    client_secret: c.env.STRAVA_CLIENT_SECRET,
    code: code!,
    grant_type: 'authorization_code',
  };

  const accessToken = await authApi.strava.fetchAccessToken(request);

  const id = await saveProfile(accessToken, c.env.KEY, c.get('db'));

  setCookie(c, 'profileId', String(id), {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10,
    path: '/',
  });

  return c.redirect(getAuthUrl('spotify', c.env));
};

export const spotifyCallback = async (c: AppContext) => {
  const code = c.req.query('code');
  const profileId = getCookie(c, 'profileId');

  if (!profileId) return c.json({ message: 'Invalid profileId' }, 400);

  const request = {
    code: code!,
    grant_type: 'authorization_code',
    redirect_uri: c.env.SPOTIFY_REDIRECT_URL,
    client_id: c.env.SPOTIFY_CLIENT_ID,
    client_secret: c.env.SPOTIFY_CLIENT_SECRET,
  };

  const accessToken = await authApi.spotify.fetchAccessToken(request);

  await syncProfileWithSpotify(accessToken, profileId, c.env.KEY, c.get('db'));

  return c.json({ message: 'Spotify connected successfully', status: 200 }, 200);
};
