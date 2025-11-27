import { Request, Response } from 'express';

import { getAuthUrl } from '@/utils/auth.utils';
import { parseSessionCookie, setSessionCookie } from '@/utils/cookie.utils';

import { fetchSpotifyAccessToken, fetchStravaAcessToken } from './auth.api';
import { saveProfile, syncWithSpotify } from './auth.service';

export const login = (_req: Request, res: Response) => {
	res.redirect(getAuthUrl('strava'));
};

export const spotifyCallback = async (req: Request, res: Response) => {
	const code = req.query.code || null;
	const stravaId = parseSessionCookie<{ stravaId: number }>(req.headers.cookie)?.stravaId;

	console.log('Spotify callback', { code, stravaId });

	if (!code) throw new Error('Error while reciving the code!');

	if (!stravaId) throw new Error('Error while reciving the Strava id!');

	const response = await fetchSpotifyAccessToken(code.toString());

	await syncWithSpotify(response, stravaId);

	res.send('Successfully synced with Spotify!');
};

export const stravaCallback = async (req: Request, res: Response) => {
	const code = req.query.code || null;

	if (!code) throw new Error('Error while reciving the code!');

	const response = await fetchStravaAcessToken(code.toString());

	const { id, redirect } = await saveProfile(response);

	if (redirect) {
		return res.json({ message: 'Already logged in', success: true });
	}

	setSessionCookie(res, { stravaId: id });

	res.redirect(getAuthUrl('spotify'));
};
