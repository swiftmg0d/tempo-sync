import type {
  Effort,
  Gear,
  Lap,
  LLMActivityInsightResponse,
  LLMHeartbeatSongsAnalysis,
  SplitMetric,
  SplitStandard,
} from '@tempo-sync/types';
import { relations } from 'drizzle-orm';
import { bigint, json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { activityMap } from './activity-map.table';
import { activitySummary } from './activity-summary.table';
import { athlete } from './athlete.table';

export const activity = pgTable('activity', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  activityId: bigint('activity_id', { mode: 'number' }).unique().notNull(),

  athleteId: varchar('athlete_id', { length: 21 })
    .notNull()
    .references(() => athlete.id, { onDelete: 'cascade' }),

  bestEfforts: json('best_efforts').$type<Effort[]>(),
  deviceName: varchar('device_name', { length: 255 }),
  gear: json().$type<Gear>(),
  laps: json().$type<Lap[]>(),
  llmActivityInsight: json('llm_activity_insight').$type<LLMActivityInsightResponse>(),
  name: varchar({ length: 255 }).notNull(),
  splitsMetric: json('splits_metric').$type<SplitMetric[]>(),
  splitsStandard: json('splits_standard').$type<SplitStandard[]>(),
  startDate: timestamp('start_date').notNull(),

  startDateLocal: timestamp('start_date_local').notNull(),
  type: varchar({ length: 255 }),

  hearBeatData: json('heart_beat_data').$type<number[]>(),
  candaceData: json('cadance_data').$type<number[]>(),
});

export const activityRelations = relations(activity, ({ one }) => ({
  acitivtySummary: one(activitySummary, {
    fields: [activity.id],
    references: [activitySummary.activityId],
    relationName: 'activity-summary',
  }),
  activityMap: one(activityMap, {
    fields: [activity.id],
    references: [activityMap.activityId],
    relationName: 'activity-map',
  }),
  athlete: one(athlete, {
    fields: [activity.athleteId],
    references: [athlete.id],
    relationName: 'activity-athlete',
  }),
}));

export type Activity = typeof activity.$inferSelect;
export type NewActivity = typeof activity.$inferInsert;
