import { stravaAPI } from '@/config/axios';
import { FetchError } from '@/errors';
import { StravaActivity } from '@/types/strava.type';

export const fetchActivity = async (
  accessToken: string,
  activityId: number,
) => {
  try {
    const response = await stravaAPI({ token: accessToken }).get<
      unknown,
      { data: StravaActivity }
    >(`/activities/${activityId}`);

    return response.data;
  } catch (e) {
    console.error(e);
    throw new FetchError('Failed to retrieve activity from Strava');
  }
};
