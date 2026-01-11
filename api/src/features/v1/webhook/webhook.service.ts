import { StravaActivity } from '@/types/strava.type';
import { incrementDateBySeconds } from '@/utils/date.utils';
import { calculateHeartRateTimeRanges, calculateSongDurationIntervals } from '@/utils/spotify.utils';

import { generetePrompt } from '../llm/llm.service';
import { fetchActivityStream } from '../spotify/spotify.api';
import { fetchSongsByActivity } from '../spotify/spotify.service';
import { updateActivityById } from '../strava/strava.api';

export const updateStravaActivityWithLLMDescription = async (activity: StravaActivity, accessToken: string) => {
	const response = await generetePrompt(activity, 'stravaDescription');

	const splitedResponse = response.split('\n');

	const [title, description] = [splitedResponse[0], splitedResponse.slice(1).join('\n')];

	const updatedActivity = await updateActivityById(title, description, accessToken, Number(activity.id));

	return updatedActivity;
};

export const getHeartRateForEachSongFromActivity = async (
	stravaAccessToken: string,
	spotifyAccessToken: string,
	activityId: number,
	startDate: Date | string,
	elapsedTime: number,
) => {
	const startActivityDate = new Date(startDate);
	const endActivityDate = incrementDateBySeconds(elapsedTime, new Date(startActivityDate));

	const songs = await fetchSongsByActivity(spotifyAccessToken, startActivityDate, endActivityDate);

	const streams = await fetchActivityStream(activityId.toString(), stravaAccessToken, ['heartrate']);

	const dataHR = streams.heartrate;

	if (!dataHR) return [];

	const heartRateTimeRanges = calculateHeartRateTimeRanges(calculateSongDurationIntervals(songs, endActivityDate), dataHR.original_size);

	const songsWithHeartRateData = heartRateTimeRanges.reduce(
		(prev, cur, index) => {
			prev.push({
				dataHR: dataHR.data.slice(index === 0 ? cur[0] : cur[0] + 1, cur[1] + 1),
				song: songs[index].track.name,
			});
			return prev;
		},
		[] as { dataHR: number[]; song: string }[],
	);
	return songsWithHeartRateData;
};
