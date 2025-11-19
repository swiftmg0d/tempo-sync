import { fetchRecentlyPlayedSongs } from './spotify.api';

export const fetchSongsByActivity = async (
  accessToken: string,
  startActivityDate: Date,
  endActivityDate: Date,
) => {
  const { items } = await fetchRecentlyPlayedSongs({
    accessToken,
    bound: { type: 'after', value: startActivityDate.getTime() },
    limit: 50,
  });

  const filteredSongsByEndDate = items.filter((song) => {
    return new Date(song.played_at) < new Date(endActivityDate);
  });

  filteredSongsByEndDate.sort(
    (a, b) => new Date(a.played_at).getTime() - new Date(b.played_at).getTime(),
  );

  return filteredSongsByEndDate;
};
