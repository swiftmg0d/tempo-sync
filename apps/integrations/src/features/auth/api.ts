import { http } from '@tempo-sync/shared/lib';

import { SPOTFIY_TOKEN_URL, SPOTIFY_AUTH_HEADER, STRAVA_TOKEN_URL } from './constants';

import type {
  SpotifyTokenRequestParams,
  SpotifyTokenResponse,
  StravaTokenRequestParams,
  StravaTokenResponse,
} from '@/shared/types/token';

export const authApi = {
  strava: {
    fetchAccessToken: (request: StravaTokenRequestParams) =>
      http<StravaTokenResponse>(
        STRAVA_TOKEN_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        },
        'Failed to fetch Strava access token'
      ),
  },
  spotify: {
    fetchAccessToken: (request: SpotifyTokenRequestParams) =>
      http<SpotifyTokenResponse>(
        SPOTFIY_TOKEN_URL,
        {
          method: 'POST',
          headers: {
            Authorization: SPOTIFY_AUTH_HEADER(request.client_id, request.client_secret),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: request.grant_type,
            code: request.code,
            redirect_uri: request.redirect_uri,
          }),
        },
        'Failed to fetch Spotify access token'
      ),
  },
};
