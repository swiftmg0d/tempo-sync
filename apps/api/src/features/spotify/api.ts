import { http, SPOTIFY_API_URL } from '@tempo-sync/shared';

import type { AthleteTopArtistResponse } from '@/shared/types/spotify';

export const spotifyAPI = {
  getTopArtists: async (token: string) => {
    return http<AthleteTopArtistResponse>(`${SPOTIFY_API_URL}/me/top/artists?limit=1&offset=1`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
