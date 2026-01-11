import { db } from '@/db';
import { activityMap } from '@/db/schema/activity-map.table';
import { activitySummary } from '@/db/schema/activity-summary.table';
import { activity } from '@/db/schema/activity.table';
import { DatabaseError } from '@/errors';
import { LLMActivityInsightResponse, LLMHeartbeatSongsAnalysis } from '@/types/llm.type';
import { StravaActivity } from '@/types/strava.type';

import { findAthleteByStravaId } from '../athlete/athlete.service';

export const saveActivity = async (
	stravaActivity: StravaActivity,
	stravaId: number,
	llmHeartBeatSongsAnalaysis?: LLMHeartbeatSongsAnalysis,
	llmActivityInsight?: LLMActivityInsightResponse,
) => {
	try {
		const athlete = await findAthleteByStravaId(stravaId);

		const [{ id }] = await db
			.insert(activity)
			.values({
				activityId: Number(stravaActivity.id),
				athleteId: athlete.id,
				bestEfforts: stravaActivity.best_efforts,
				deviceName: stravaActivity.device_name,
				gear: stravaActivity.gear,
				laps: stravaActivity.laps,
				llmActivityInsight,
				llmHeartBeatSongsAnalaysis,
				name: stravaActivity.name,
				splitsMetric: stravaActivity.splits_metric,
				splitsStandard: stravaActivity.splits_standard,
				startDate: new Date(stravaActivity.start_date),
				startDateLocal: new Date(stravaActivity.start_date_local),
				type: stravaActivity.type,
			})
			.returning({ id: activity.id });

		await db.insert(activityMap).values({
			activityId: id,
			mapId: stravaActivity.map.id,
			polyline: stravaActivity.map.polyline,
			summaryPolyline: stravaActivity.map.summary_polyline,
		});

		await db.insert(activitySummary).values({
			activityId: id,
			averageCadence: stravaActivity.average_cadence,
			averageHeartrate: stravaActivity.average_heartrate,
			averageSpeed: stravaActivity.average_speed,
			calories: stravaActivity.calories,
			distance: stravaActivity.distance,
			elapsedTime: stravaActivity.elapsed_time,
			elevHigh: stravaActivity.elev_high,
			elevLow: stravaActivity.elev_low,
			endLatlng: stravaActivity.end_latlng,
			hasHeartrate: stravaActivity.has_heartrate,
			maxHeartrate: stravaActivity.max_heartrate,
			maxSpeed: stravaActivity.max_speed,
			movingTime: stravaActivity.moving_time,
			startLatlng: stravaActivity.start_latlng,
			totalElevationGain: stravaActivity.total_elevation_gain,
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
