import type { AppContext } from '@/shared/types';
import type { TokenProvider } from '@tempo-sync/db';
import { SPOTIFY_AUTH_URL, STRAVA_AUTH_URL } from './constants';

export const getAuthUrl = (type: TokenProvider, env: AppContext['env']) => {
	const state = Math.random().toString(36).substring(2, 18);

	const {
		SPOTIFY_CLIENT_ID,
		SPOTIFY_SCOPE,
		SPOTIFY_REDIRECT_URL,
		STRAVA_CLIENT_ID,
		STRAVA_SCOPE,
		STRAVA_REDIRECT_URL,
	} = env;

	const authUrls = {
		spotify:
			SPOTIFY_AUTH_URL +
			`response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${SPOTIFY_SCOPE}&redirect_uri=${SPOTIFY_REDIRECT_URL}&state=${state}`,
		strava:
			STRAVA_AUTH_URL +
			`client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URL}&approval_prompt=force&scope=${STRAVA_SCOPE}`,
	};

	return authUrls[type];
};
