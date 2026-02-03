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
  },
};
