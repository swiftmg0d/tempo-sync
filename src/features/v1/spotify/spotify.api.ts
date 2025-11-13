import { spotifyAPI, stravaAPI } from '@/config/axios';
import { RECENTLY_PLAYED_SONGS } from '@/constants/api/spotify';
import { FetchError } from '@/errors';
import { RecentlyPlayedSongsProperties } from '@/types/spotify.type';
import { ActivityStream, streamKeys } from '@/types/strava.type';
import { PlayHistorySong } from '@/types/track.type';

export const fetchRecentlyPlayedSongs = async ({
  accessToken,
  bound,
  limit,
}: RecentlyPlayedSongsProperties) => {
  try {
    const params = new URLSearchParams();
    params.set(bound.type, bound.value.toString());
    params.set('limit', limit.toString());

    const { data } = await spotifyAPI({ token: accessToken }).get<{
      items: PlayHistorySong[];
    }>(RECENTLY_PLAYED_SONGS, { params });

    return data;
  } catch (e) {
    console.error(e);
    throw new FetchError('Failed to fetch recently played songs!');
  }
};

export const fetchActivityStream = async (
  activityId: string,
  accessToken: string,
  keys: streamKeys[],
) => {
  try {
    const params = new URLSearchParams();
    params.set('key_by_type', 'true');
    params.set('keys', keys.join(', '));

    const { data } = await stravaAPI({
      token: accessToken,
    }).get<ActivityStream>(`/activities/${activityId}/streams`, {
      params: params,
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new FetchError('Failed to fetch activity stream!');
  }
};
