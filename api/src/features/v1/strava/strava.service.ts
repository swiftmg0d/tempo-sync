import { db } from '@/db';
import { activityMap } from '@/db/schema/activity-map.table';
import { activitySummary } from '@/db/schema/activity-summary.table';
import { activity } from '@/db/schema/activity.table';
import { DatabaseError } from '@/errors';
import { LLMActivityInsightResponse, LLMHeartbeatSongsAnalysis } from '@/types/llm.type';
import { StravaActivity, StravaActivityCamal } from '@/types/strava.type';
import { convertToCamelCase } from '@/utils/case.utils';

import { findAthleteByStravaId } from '../athlete/athlete.service';

export const saveActivity = async (
	stravaActivity: StravaActivity,
	stravaId: number,
	llmHeartBeatSongsAnalaysis?: LLMHeartbeatSongsAnalysis,
	llmActivityInsight?: LLMActivityInsightResponse,
) => {
	try {
		const converted = convertToCamelCase<StravaActivity, StravaActivityCamal>(stravaActivity);

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
				llmActivityInsight,
				llmHeartBeatSongsAnalaysis,
				name: converted.name,
				splitsMetric: converted.splitsMetric,
				splitsStandard: converted.splitsStandard,
				startDate: new Date(converted.startDate),
				startDateLocal: new Date(converted.startDateLocal),
				type: converted.type,
			})
			.returning({ id: activity.id });

		await db.insert(activityMap).values({
			activityId: id,
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
