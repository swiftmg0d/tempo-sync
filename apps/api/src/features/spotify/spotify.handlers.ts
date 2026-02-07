import { spotifyAPI } from './api';

import { resetToken } from '@/shared/lib';
import type { AppContext } from '@/shared/types/bindings';
import type { TopArtist } from '@/shared/types/spotify';

export const getAthleteTopArtist = async (c: AppContext) => {
  const token = await resetToken({ db: c.get('db'), env: c.env, provider: 'spotify' });

  const { items } = await spotifyAPI.getTopArtists(token);

  const topArtist: TopArtist = {
    name: items[0].name,
    href: items[0].external_urls.spotify,
  };

  return c.json(topArtist);
};
