import { CLIENT_ID, REDIRECT_URL, REDIRECT_URL_STRAVA, SCOPE, STRAVA_CLIENT_ID, STRAVA_SCOPE } from '@/config/env';
import { SPOTIFY_AUTH_URL, STRAVA_AUTH_URL } from '@/constants';
import { AuthType } from '@/types/auth.type';

export const getAuthUrl = (type: AuthType) => {
	const state = Math.random().toString(36).substring(2, 18);

	const authUrls = {
		spotify: SPOTIFY_AUTH_URL + `response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URL}&state=${state}`,
		strava:
			STRAVA_AUTH_URL +
			`client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL_STRAVA}&approval_prompt=force&scope=${STRAVA_SCOPE}`,
	};

	return authUrls[type];
};
