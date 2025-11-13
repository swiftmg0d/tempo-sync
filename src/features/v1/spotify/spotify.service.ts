import { fetchRecentlyPlayedSongs } from './spotify.api';

export const fetchSongsByActivity = async (accessToken: string) => {
  const startActivityDate = new Date('2025-11-13T13:29:59.912Z'); // TODO Change it later with activity date
  const endActivityDate = new Date('2025-11-13T14:58:15.590Z'); // TODO Change it later with activity date

  const { items } = await fetchRecentlyPlayedSongs({
    accessToken,
    bound: { type: 'after', value: startActivityDate.getTime() },
    limit: 50,
  });

  const filteredSongsByEndDate = items.filter((song) => {
    return new Date(song.played_at) < endActivityDate;
  });

  return filteredSongsByEndDate;
};
