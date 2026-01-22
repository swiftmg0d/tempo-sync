import { and, eq, sql } from 'drizzle-orm';

import type { AnyDatabase } from '../client';
import {
  activity,
  activityMap,
  activitySummary,
  athlete,
  sync,
  token,
  type NewActivity,
  type NewToken,
  type TokenProvider,
  type TokenType,
} from '../schema';
import { date } from 'drizzle-orm/mysql-core';

export const athleteQueries = {
  findAthleteByStravaId:
    (db: AnyDatabase) =>
    ({ stravaId }: { stravaId: number }) => {
      return db
        .select({
          id: athlete.id,
        })
        .from(athlete)
        .where(eq(athlete.stravaProfileId, stravaId))
        .limit(1);
    },
  getAthleteProfile: ({ db }: { db: AnyDatabase }) => {
    return db.select().from(athlete).limit(1);
  },
};

export const tokenQueries = {
  findTokenByProviderAndId:
    (db: AnyDatabase) =>
    ({ provider, id, type }: { provider: TokenProvider; id: string; type: TokenType }) => {
      return db
        .select()
        .from(token)
        .where(and(eq(token.provider, provider), eq(token.athleteId, id), eq(token.type, type)))
        .limit(1);
    },
  updateTokenById: ({
    db,
    tokenData,
    id,
  }: {
    db: AnyDatabase;
    tokenData: NewToken;
    id: string;
  }) => {
    return db
      .update(token)
      .set({ ...tokenData })
      .where(
        and(
          eq(token.athleteId, id),
          eq(token.type, tokenData.type),
          eq(token.provider, tokenData.provider)
        )
      )
      .returning();
  },
};

export const activityQueries = {
  getAllActivities: ({ db, page, limit }: { db: AnyDatabase; page: number; limit: number }) => {
    return db
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
  },
};

export const activitySummaryQueries = {
  getActivitySummaryById: ({ db, activityId }: { db: AnyDatabase; activityId: string }) => {
    return db
      .select({
        avgHr: activitySummary.averageHeartrate,
        avgPace: activitySummary.averageSpeed,
        calories: activitySummary.calories,
        distance: activitySummary.distance,
        id: activity.id,
        title: activity.name,
        date: activity.startDate,
        deviceName: activity.deviceName,
        gear: sql<string>`${activity.gear}->>'name'`,
      })
      .from(activitySummary)
      .where(eq(activitySummary.activityId, activityId))
      .innerJoin(activity, eq(activity.id, activitySummary.activityId));
  },
  getAllActivitiesSummaryStats: ({ db }: { db: AnyDatabase }) => {
    return db
      .select({
        totalActivities: sql<number>`sum(${activitySummary.distance})`,
        totalCount: sql<number>`count(*)`,
        totalCalories: sql<number>`sum(${activitySummary.calories})`,
        totalAvgHr: sql<number>`avg(${activitySummary.averageHeartrate})`,
      })
      .from(activitySummary);
  },
};

export const syncQueries = {
  getLastSyncTime: (db: AnyDatabase) => {
    return db.select().from(sync).limit(1);
  },
  updateLastSyncTime: (db: AnyDatabase, time: Date) => {
    return db.update(sync).set({ date: time }).returning();
  },
};
