import type { AthleteStatsResponse } from '@/shared/types/strava';
import { http, STRAVA_API_URL } from '@tempo-sync/shared';

export const stravaAPI = {
  getStats: (id: number, token: string) =>
    http<AthleteStatsResponse>(`${STRAVA_API_URL}/athletes/${id}/stats`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
