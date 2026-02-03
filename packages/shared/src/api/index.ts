import type {
  RefreshTokenRequestParams,
  SpotifyTokenResponse,
  StravaTokenResponse,
} from '@tempo-sync/types';
import { http } from '../lib';
import { SPOTFIY_TOKEN_URL, SPOTIFY_AUTH_HEADER, STRAVA_TOKEN_URL } from '../constants';

export const refreshToken = {
  strava: {
    refreshToken: ({ request }: { request: RefreshTokenRequestParams }) =>
      http<StravaTokenResponse>(
        STRAVA_TOKEN_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: request.grant_type,
            client_id: request.client_id,
            client_secret: request.client_secret,
            refresh_token: request.refresh_token,
          }),
        },
        'Failed to refresh Strava token'
      ),
  },
  spotify: {
    refreshToken: ({ request }: { request: RefreshTokenRequestParams }) =>
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
            refresh_token: request.refresh_token,
            client_id: request.client_id,
          }),
        },
        'Failed to refresh Spotify token'
      ),
  },
};
