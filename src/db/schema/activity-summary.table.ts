import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  decimal,
  integer,
  pgTable,
} from 'drizzle-orm/pg-core';

import { activity } from './activity.table';

export const activitySummary = pgTable('activity_summary', {
  activityId: bigint('activity_id', { mode: 'bigint' }).references(
    () => activity.id,
    {
      onDelete: 'cascade',
    },
  ),
  averageCadence: decimal('average_cadence', { mode: 'number' }),
  averageHeartrate: decimal('average_heartrate', { mode: 'number' }),
  averageSpeed: decimal('average_speed', { mode: 'number' }).notNull(),
  elapsedTime: integer('elapsed_time').notNull(),
  elevHigh: decimal('elev_high', { mode: 'number' }),
  elevLow: decimal('elev_low', { mode: 'number' }),
  endLatlng: decimal('end_latlng', { mode: 'number' }).array(),
  hasHeartrate: boolean('has_heartrate').notNull(),
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  maxHeartrate: decimal('max_heartrate', { mode: 'number' }),
  maxSpeed: decimal('max_speed', { mode: 'number' }),
  movingTime: integer('moving_time').notNull(),
  startLatlng: decimal('start_latlng', { mode: 'number' }).array(),
  totalElevationGain: decimal('total_elevation_gain', { mode: 'number' }),
});

export const activitySummaryRelations = relations(
  activitySummary,
  ({ one }) => ({
    activity: one(activity, {
      fields: [activitySummary.id],
      references: [activity.id],
    }),
  }),
);
