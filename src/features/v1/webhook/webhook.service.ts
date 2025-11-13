import {
  calculateHeartRateTimeRanges,
  calculateSongDurationIntervals,
} from '@/utils/spotify.utils';

import { fetchActivityStream } from '../spotify/spotify.api';
import { fetchSongsByActivity } from '../spotify/spotify.service';

export const getHeartRateForEachSongFromActivity = async (
  stravaAccessToken: string,
  spotifyAccessToken: string,
  activityId: number,
) => {
  //   const activity = await fetchActivity(stravaAccessToken, activityId);

  const songs = await fetchSongsByActivity(spotifyAccessToken);

  const streams = await fetchActivityStream(
    activityId.toString(),
    stravaAccessToken,
    ['heartrate'],
  );

  const dataHR = streams.heartrate;

  if (!dataHR) return;

  const arr = calculateHeartRateTimeRanges(
    calculateSongDurationIntervals(songs),
    dataHR.original_size,
  );

  arr.forEach((val, i) => {
    console.log(`Song ${i}: ${songs[i].track.name}, Hr indexes from : ${val}`);
    console.log(dataHR.data.slice(i === 0 ? val[0] : val[0] + 1, val[1] + 1));
  });
};
