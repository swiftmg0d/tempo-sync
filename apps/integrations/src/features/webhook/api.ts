import { STRAVA_API_URL, SPOTIFY_API_URL } from '@tempo-sync/shared';
import { http } from '@tempo-sync/shared/lib';
import type { StravaActivity } from '@tempo-sync/shared/types';

import type { RecentlyPlayedTracksResponse } from '@/shared/types/spotify';
import type { StreamData } from '@/shared/types/strava';

export const webhookApi = {
  strava: {
    fetchActivityById: async ({
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
    updateActivityById: async ({
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
    getActivityStreams: async ({
      activityId,
      accessToken,
    }: {
      activityId: string;
      accessToken: string;
    }) => {
      const params = new URLSearchParams({
        keys: 'heartrate,cadence,velocity_smooth',
        key_by_type: 'true',
      }).toString();

      return http<StreamData>(
        `${STRAVA_API_URL}/activities/${activityId}/streams?${params}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
        'Failed to fetch Strava activity streams by ID'
      );
    },
  },
  spotify: {
    fetchRecentlyPlayedTracks: async ({
      accessToken,
      after,
      before,
    }: {
      accessToken: string;
      after?: number;
      before?: number;
    }) => {
      const params = new URLSearchParams({
        limit: '50',
        ...(after ? { after: after.toString() } : {}),
        ...(before ? { before: before.toString() } : {}),
      }).toString();

      return http<RecentlyPlayedTracksResponse>(
        `${SPOTIFY_API_URL}/me/player/recently-played?${params}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        'Failed to fetch Spotify recently played tracks'
      );
    },
  },
};
