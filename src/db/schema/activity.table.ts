import { relations } from 'drizzle-orm';
import {
  bigint,
  decimal,
  json,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { activityMap } from '@/db/schema/activity-map.table';
import {
  EffortCamal,
  GearCamal,
  LapCamal,
  SplitMetricCamal,
  SplitStandardCamal,
} from '@/types/strava.type';

import { activitySummary } from './activity-summary.table';
import { athlete } from './athlete.table';

export const activity = pgTable('activity', {
  activityId: bigint('activity_id', { mode: 'bigint' }).unique().notNull(),
  athleteId: bigint('athlete_id', { mode: 'bigint' })
    .unique()
    .notNull()
    .references(() => athlete.id, { onDelete: 'cascade' }),
  bestEfforts: json('best_efforts').$type<EffortCamal[]>(),

  deviceName: varchar({ length: 255 }),
  distance: decimal({ mode: 'number' }).notNull(),
  gear: json().$type<GearCamal>(),
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  laps: json().$type<LapCamal[]>(),
  name: varchar({ length: 255 }).notNull(),
  splitsMetric: json('splits_metric').$type<SplitMetricCamal[]>(),
  splitsStandard: json('splits_standard').$type<SplitStandardCamal[]>(),
  startDate: timestamp('start_date').notNull(),
  startDateLocal: timestamp('start_date_local').notNull(),
  type: varchar({ length: 255 }),
});

export const activityRelations = relations(activity, ({ one }) => ({
  acitivtySummary: one(activitySummary),
  activityMap: one(activityMap),
  athlete: one(athlete),
}));
