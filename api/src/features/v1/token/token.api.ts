import { AxiosError } from 'axios';

import { spotifyAPI, stravaAPI } from '@/config/axios';
import { CLIENT_ID, STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from '@/config/env';
import { SPOTFIY_TOKEN_URL, SPOTIFY_AUTH_HEADER, STRAVA_TOKEN_URL } from '@/constants';
import { FetchError } from '@/errors';
import { TokenResponse } from '@/types/auth.type';
import { decrypt } from '@/utils/crypt.utils';

export const refreshSpotifyToken = async (value: string) => {
	try {
		const params = new URLSearchParams();
		params.append('grant_type', 'refresh_token');
		params.append('refresh_token', decrypt(value));
		params.append('client_id', CLIENT_ID!);

		const { data } = await spotifyAPI({
			baseURL: SPOTFIY_TOKEN_URL,
			headers: { Authorization: SPOTIFY_AUTH_HEADER },
		}).post<TokenResponse>('', params);

		return data;
	} catch (e) {
		const statusCode = undefined;
		if (e instanceof AxiosError) {
			console.error('Error response: \n', e.response?.data);
		}
		throw new FetchError('Failed to refresh token securely', statusCode);
	}
};

export const refreshAccessToken = async (tokenType: 'spotify' | 'strava', value: string) => {
	if (tokenType == 'strava') return await refreshStravaToken(value);

	return await refreshSpotifyToken(value);
};

export const refreshStravaToken = async (value: string) => {
	try {
		const params = new URLSearchParams();
		params.append('client_id', STRAVA_CLIENT_ID!);
		params.append('client_secret', STRAVA_CLIENT_SECRET!);
		params.append('grant_type', 'refresh_token');
		params.append('refresh_token', decrypt(value));

		const { data } = await stravaAPI({
			baseURL: STRAVA_TOKEN_URL,
		}).post<TokenResponse>('', params);

		return data;
	} catch (e) {
		const statusCode = undefined;
		if (e instanceof AxiosError) {
			console.error('Error response: \n', e.response?.data);
		}
		throw new FetchError('Failed to refresh token securely', statusCode);
	}
};
