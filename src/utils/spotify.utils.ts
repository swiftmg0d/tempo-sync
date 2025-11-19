import { PlayHistorySong } from '@/types/track.type';

export const calculateSongDurationIntervals = (
  songs: PlayHistorySong[],
  endActivityDate: Date,
) => {
  const songDurationIntervals = [...songs]
    .map((song, i) => {
      if (i == songs.length - 1) {
        return Math.floor(
          Math.abs(
            new Date(song.played_at).getTime() - endActivityDate.getTime(),
          ) / 1000,
        );
      }

      return Math.floor(
        Math.abs(
          new Date(song.played_at).getTime() -
            new Date(songs[i + 1].played_at).getTime(),
        ) / 1000,
      );
    })
    .filter((i) => i != undefined);

  return songDurationIntervals;
};

export const calculateHeartRateTimeRanges = (
  songDurationIntervals: number[],
  heartRateDataLength: number,
) => {
  let currentOffset = 0;

  const timeRanges = songDurationIntervals.reduce(
    (prev, curr) => {
      if (
        currentOffset < heartRateDataLength &&
        currentOffset + curr > heartRateDataLength
      ) {
        prev.push([currentOffset, heartRateDataLength]);
        currentOffset += curr;

        return prev;
      } else if (
        currentOffset > heartRateDataLength ||
        currentOffset + curr > heartRateDataLength
      ) {
        return prev;
      }

      prev.push([currentOffset, currentOffset + curr]);
      currentOffset += curr;

      return prev;
    },
    [] as [number, number][],
  );

  return timeRanges;
};
