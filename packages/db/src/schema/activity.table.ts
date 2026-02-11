import type {
  Effort,
  Gear,
  Lap,
  LLMActivityInsightResponse,
  RecommendedTrack,
  SplitMetric,
  SplitStandard,
  TrackLeaderboardResponse,
} from '@tempo-sync/types';
import { bigint, json, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { athlete } from './athlete.table';
import { tempoSyncSchema } from './schema';

export const activity = tempoSyncSchema.table('activity', {
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
  llmTrackLeaderboard: json('llm_track_leaderboard').$type<TrackLeaderboardResponse>(),
  llmTrackRecommendations: json('llm_track_recommendations').$type<RecommendedTrack[]>(),
  name: varchar({ length: 255 }).notNull(),
  splitsMetric: json('splits_metric').$type<SplitMetric[]>(),
  splitsStandard: json('splits_standard').$type<SplitStandard[]>(),
  startDate: timestamp('start_date').notNull(),

  startDateLocal: timestamp('start_date_local').notNull(),
  type: varchar({ length: 255 }),
});

export type Activity = typeof activity.$inferSelect;
export type NewActivity = typeof activity.$inferInsert;
