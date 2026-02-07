import {
  activity,
  activityQueries,
  activitySummaryQueries,
  sql,
  type PoolDatabase,
} from '@tempo-sync/db';
import { decodeActivityMap } from '@tempo-sync/shared';
import { DatabaseError } from '@tempo-sync/shared/errors';
import type { Activities, ActivitySummary } from '@tempo-sync/shared/types';

export const getAthleteActivities = async (
  db: PoolDatabase,
  page: number,
  limit: number
): Promise<Activities> => {
  try {
    const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(activity);

    const activities = await activityQueries.getAllActivities({
      db,
      page,
      limit,
    });

    const hasMore = page * limit < total;

    return {
      activities: activities.map((activity) => ({
        ...activity,
        polyline: decodeActivityMap(activity.polyline),
      })),
      pagination: {
        hasMore,
        limit,
        nextPage: hasMore ? page + 1 : null,
        page,
        total,
      },
    };
  } catch (e) {
    console.error('Error fetching activities:', e);
    throw new DatabaseError(500, 'Failed to fetch activities from database');
  }
};

export const getActivitySummaryById = async (
  activityId: string,
  db: PoolDatabase
): Promise<ActivitySummary> => {
  try {
    const convertToPace = (speed: number) => {
      return 1000 / speed / 60;
    };

    const [summary] = await activitySummaryQueries.getActivitySummaryById({
      db,
      activityId,
    });

    return {
      ...summary,
      avgPace: Math.round(convertToPace(summary.avgPace) * 100) / 100,
      distance: Math.round((summary.distance / 1000) * 100) / 100,
    };
  } catch (e) {
    console.error(e);
    throw new DatabaseError(400, 'Failed to get activity summary!');
  }
};

export const getActivitiesSummaryStats = async (db: PoolDatabase) => {
  try {
    const [result] = await activitySummaryQueries.getAllActivitiesSummaryStats({
      db,
    });

    return [
      {
        icon: 'runner',
        id: crypto.randomUUID(),
        info: 'Total runs',
        title: 'Lifetime',
        value: result.totalCount,
      },
      {
        icon: 'map',
        id: crypto.randomUUID(),
        info: 'Total distance',
        label: 'km',
        title: 'All time',
        value: Math.round(result.totalActivities / 1000),
      },
      {
        icon: 'calorieBurn',
        id: crypto.randomUUID(),
        info: 'Total calories burned',
        label: 'kcal',
        title: 'All time',
        value: Math.round(result.totalCalories),
      },
      {
        icon: 'heart',
        id: crypto.randomUUID(),
        info: 'Average Heart Rate',
        label: 'bpm',
        title: 'All time',
        value: Math.round(result.totalAvgHr),
      },
    ];
  } catch (e) {
    console.error(e);
    throw new DatabaseError(400, 'Failed to get activities summary stats!');
  }
};
