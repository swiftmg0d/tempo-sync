import type { StreamData } from '@/shared/types/strava';
import { STRAVA_API_URL } from '@tempo-sync/shared';
import { http } from '@tempo-sync/shared/lib';
import type { StravaActivity } from '@tempo-sync/shared/types';

export const webhookApi = {
  strava: {
    fetchActivityById: ({ activityId, accessToken }: { activityId: string; accessToken: string }) =>
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
    getActivityStreams: ({
      activityId,
      accessToken,
    }: {
      activityId: string;
      accessToken: string;
    }) => {
      const params = new URLSearchParams({
        keys: 'heartrate,cadence',
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
};
