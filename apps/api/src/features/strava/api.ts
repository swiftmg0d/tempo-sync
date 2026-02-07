import { http, STRAVA_API_URL } from '@tempo-sync/shared';

import type { AthleteStatsResponse } from '@/shared/types/strava';

export const stravaAPI = {
  getStats: async (id: number, token: string) =>
    http<AthleteStatsResponse>(`${STRAVA_API_URL}/athletes/${id}/stats`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
