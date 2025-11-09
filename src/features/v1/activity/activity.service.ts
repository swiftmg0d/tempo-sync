import { stravaAPI } from '@/config/axios';
import { db } from '@/db';
import { activityMap } from '@/db/schema/activity-map.table';
import { activitySummary } from '@/db/schema/activity-summary.table';
import { activity } from '@/db/schema/activity.table';
import { DatabaseError, FetchError } from '@/errors';
import { StravaActivity, StravaActivityCamal } from '@/types/activity.type';
import { convertToCamelCase } from '@/utils/case.utils';
import { decrypt } from '@/utils/crypt.utils';

import { findAthleteByStravaId } from '../athlete/athlete.service';

export const fetchActivity = async (
  accessToken: string,
  activityId: number,
) => {
  try {
    const response = await stravaAPI({ token: decrypt(accessToken) }).get<
      unknown,
      { data: StravaActivity }
    >(`/activities/${activityId}`);

    return response.data;
  } catch (e) {
    console.error(e);
    throw new FetchError('Failed to retrieve activity from Strava');
  }
};

export const saveActivity = async (
  stravaActivity: StravaActivity,
  stravaId: number,
) => {
  try {
    const converted = convertToCamelCase<StravaActivity, StravaActivityCamal>(
      stravaActivity,
    );

    const athlete = await findAthleteByStravaId(stravaId);

    const [{ id }] = await db
      .insert(activity)
      .values({
        activityId: converted.id,
        athleteId: BigInt(athlete.id),
        bestEfforts: converted.bestEfforts,
        deviceName: converted.deviceName,
        distance: converted.distance,
        gear: converted.gear,
        laps: converted.laps,
        name: converted.name,
        splitsMetric: converted.splitsMetric,
        splitsStandard: converted.splitsStandard,
        startDate: new Date(converted.startDate),
        startDateLocal: new Date(converted.startDateLocal),
        type: converted.type,
      })
      .returning({ id: activity.id });

    await db.insert(activityMap).values({
      acitvityId: id,
      mapId: converted.map.id,
      polyline: converted.map.polyline,
      summaryPolyline: converted.map.summaryPolyline,
    });

    await db.insert(activitySummary).values({
      activityId: id,
      averageCadence: converted.averageCadence,
      averageHeartrate: converted.averageHeartrate,
      averageSpeed: converted.averageSpeed,
      elapsedTime: converted.elapsedTime,
      elevHigh: converted.elevHigh,
      elevLow: converted.elevLow,
      endLatlng: converted.endLatlng,
      hasHeartrate: converted.hasHeartrate,
      maxHeartrate: converted.maxHeartrate,
      maxSpeed: converted.maxSpeed,
      movingTime: converted.movingTime,
      startLatlng: converted.startLatlng,
      totalElevationGain: converted.totalElevationGain,
    });

    return {
      message: 'Successfully saved activity!',
      success: true,
    };
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Failed to save activity to database!', 500);
  }
};
