import { http } from '@tempo-sync/shared/lib';
import {
  SPOTFIY_TOKEN_URL,
  SPOTIFY_AUTH_HEADER,
  STRAVA_API_URL,
  STRAVA_TOKEN_URL,
} from '../auth/constants';
import type {
  RefreshTokenRequestParams,
  SpotifyTokenResponse,
  StravaTokenResponse,
} from '@/shared/types/token';
import type { StravaActivity } from '@tempo-sync/shared/types';

export const webhookApi = {
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

    fetchActivityById: ({
      activityId,
      accessToken,
    }: {
      activityId: string;
      accessToken: string;
    }) =>
      http<StravaActivity>(
        `${STRAVA_API_URL}/activities/${activityId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        'Failed to fetch Strava activity by ID'
      ),
    updateActivityById: ({
      activityId,
      accessToken,
      data,
    }: {
      activityId: string;
      accessToken: string;
      data: Partial<StravaActivity>;
    }) => {
      return http<StravaActivity>(
        `${STRAVA_API_URL}/activities/${activityId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        'Failed to update Strava activity by ID'
      );
    },
  },
  spotify: {
    refreshToken: ({ request }: { request: RefreshTokenRequestParams }) =>
      http<SpotifyTokenResponse>(
        SPOTFIY_TOKEN_URL,
        {
          method: 'POST',
          headers: {
            Authorization: SPOTIFY_AUTH_HEADER(
              request.client_id,
              request.client_secret
            ),
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
