import { AxiosError } from 'axios';

import { stravaAPI } from '@/config/axios';
import { FetchError } from '@/errors';
import { StravaActivity } from '@/types/strava.type';

export const fetchActivity = async (accessToken: string, activityId: number) => {
	try {
		const response = await stravaAPI({ token: accessToken }).get<unknown, { data: StravaActivity }>(`/activities/${activityId}`);

		return response.data;
	} catch (e) {
		let statusCode = undefined;
		if (e instanceof AxiosError) {
			console.error('Error response: \n', e.response?.data);
			statusCode = e.status;
		}
		throw new FetchError('Failed to retrieve activity from Strava', statusCode);
	}
};

export const updateActivityById = async (name: string, description: string, accessToken: string, activityId: number) => {
	try {
		const { data } = await stravaAPI({
			token: accessToken,
		}).put<StravaActivity>(`/activities/${activityId}`, { description, name });

		return data;
	} catch (e) {
		let statusCode = undefined;
		if (e instanceof AxiosError) {
			console.error('Error response: \n', e.response?.data);
			statusCode = e.status;
		}
		throw new FetchError('Failed to update activity in Strava!', statusCode);
	}
};
