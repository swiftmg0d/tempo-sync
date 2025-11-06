import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { getAuthUrl } from '@/utils/auth.utils';

declare module 'express-session' {
  interface SessionData {
    stravaId: number;
  }
}

import {
  fetchSpotifyAccessToken,
  fetchStravaAcessToken,
  saveProfile,
  syncWithSpotify,
} from './auth.service';

dotenv.config();

export const login = (_req: Request, res: Response) => {
  res.redirect(getAuthUrl('strava'));
};

export const spotifyCallback = async (req: Request, res: Response) => {
  const code = req.query.code || null;
  const stravaId = req.session.stravaId || null;

  if (!code) throw new Error('Error while reciving the code!');

  if (!stravaId) throw new Error('Error while reciving the Strava id!');

  const response = await fetchSpotifyAccessToken(code.toString());

  await syncWithSpotify(response, stravaId);

  res.send('oke');
};

export const stravaCallback = async (req: Request, res: Response) => {
  const code = req.query.code || null;

  if (!code) throw new Error('Error while reciving the code!');

  const response = await fetchStravaAcessToken(code.toString());

  const { id, redirect } = await saveProfile(response);

  if (redirect) res.send('Redirected change later'); // TODO: Change it latter on with real redirection

  req.session.stravaId = id;

  res.redirect(getAuthUrl('spotify'));
};
