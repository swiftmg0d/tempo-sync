import { eq, sql } from 'drizzle-orm';

import { db } from '@/db';
import { activity, activityMap, activitySummary } from '@/db/schema';
import { DatabaseError } from '@/errors';

import { decodeActivityMap } from './activity.utils';

export const getAthleteActivities = async (page: number, limit: number) => {
	try {
		const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(activity);

		await db
			.select()
			.from(activity)
			.limit(limit)
			.offset((page - 1) * limit);

		const activities = await db
			.select({
				date: activity.startDate,
				id: activity.id,
				polyline: activityMap.polyline,
				time: activitySummary.elapsedTime,
				title: activity.name,
			})
			.from(activity)
			.innerJoin(activityMap, eq(activityMap.activityId, activity.id))
			.innerJoin(activitySummary, eq(activitySummary.activityId, activity.id))
			.limit(limit)
			.offset((page - 1) * limit);

		const hasMore = page * limit < total;

		return {
			activities: activities.map((activity) => ({ ...activity, polyline: decodeActivityMap(activity.polyline) })),
			pagination: {
				hasMore,
				limit,
				nextPage: hasMore ? page + 1 : null,
				page,
				total,
			},
		};
	} catch (e) {
		console.error(e);
		throw new DatabaseError('Failed to get activities!');
	}
};

export const getActivitySummaryById = async (activityId: number) => {
	const convertToPace = (speed: number) => {
		return 1000 / speed / 60;
	};

	try {
		const [summary] = await db
			.select({
				avgHr: activitySummary.averageHeartrate,
				avgPace: activitySummary.averageSpeed,
				calories: activitySummary.calories,
				distance: activitySummary.distance,
				id: activity.id,
				title: activity.name,
			})
			.from(activitySummary)
			.where(eq(activitySummary.activityId, activityId))
			.innerJoin(activity, eq(activity.id, activitySummary.activityId));

		return {
			...summary,
			avgPace: Math.round(convertToPace(summary.avgPace) * 100) / 100,
			distance: Math.round((summary.distance / 1000) * 100) / 100,
		};
	} catch (e) {
		console.error(e);
		throw new DatabaseError('Failed to get activity summary!');
	}
};

export const getActivitiesSummaryStats = async () => {
	try {
		const [result] = await db
			.select({
				totalActivities: sql<number>`sum(${activitySummary.distance})`,
				totalCount: sql<number>`count(*)`,
			})
			.from(activitySummary);

		return [
			{
				icon: 'runner',
				id: crypto.randomUUID(),
				info: 'Total runs',
				title: 'Lifetime',
				value: result.totalCount ?? 0,
			},
			{
				icon: 'map',
				id: crypto.randomUUID(),
				info: 'Total distance',
				label: 'km',
				title: 'All time',
				value: Math.round(result.totalActivities / 1000),
			},
		];
	} catch (e) {
		console.error(e);
		throw new DatabaseError('Failed to get activities summary stats!');
	}
};
