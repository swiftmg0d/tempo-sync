import {
  SPOTFIY_TOKEN_URL,
  SPOTIFY_AUTH_HEADER,
  STRAVA_TOKEN_URL,
  type SpotifyTokenRequestParams,
  type SpotifyTokenResponse,
  type StravaTokenRequestParams,
  type StravaTokenResponse,
} from '@tempo-sync/shared';
import { http } from '@tempo-sync/shared/lib';

export const authApi = {
  strava: {
    fetchAccessToken: async (request: StravaTokenRequestParams) =>
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
    fetchAccessToken: async (request: SpotifyTokenRequestParams) =>
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
