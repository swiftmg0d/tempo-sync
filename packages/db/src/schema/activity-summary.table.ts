import { relations } from 'drizzle-orm';
import { boolean, doublePrecision, integer, pgTable, real, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { activity } from './activity.table';

export const activitySummary = pgTable('activity_summary', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  activityId: varchar('activity_id', { length: 21 }).references(() => activity.id, {
    onDelete: 'cascade',
  }),

  distance: real('distance').notNull(),
  elapsedTime: integer('elapsed_time').notNull(),
  movingTime: integer('moving_time').notNull(),

  averageCadence: real('average_cadence'),
  averageHeartrate: real('average_heartrate'),
  averageSpeed: real('average_speed').notNull(),
  maxSpeed: real('max_speed'),
  calories: real('calories'),

  elevHigh: real('elev_high'),
  elevLow: real('elev_low'),
  endLatlng: doublePrecision('end_latlng').array(),
  startLatlng: doublePrecision('start_latlng').array(),
  totalElevationGain: doublePrecision('total_elevation_gain'),

  hasHeartrate: boolean('has_heartrate').notNull(),
  maxHeartrate: real('max_heartrate'),
});

export const activitySummaryRelations = relations(activitySummary, ({ one }) => ({
  activity: one(activity, {
    fields: [activitySummary.activityId],
    references: [activity.id],
    relationName: 'activity-summary',
  }),
}));

export type ActivitySummary = typeof activitySummary.$inferSelect;
export type NewActivitySummary = typeof activitySummary.$inferInsert;
