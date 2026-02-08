import { integer, json, real, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { activity } from './activity.table';
import { tempoSyncSchema } from './schema';

interface Artist {
  id: string;
  name: string;
  href: string;
}

interface TrackImage {
  url: string;
  height: number;
  width: number;
}

export const track = tempoSyncSchema.table('track', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  trackId: varchar('track_id', { length: 255 }).notNull(),
  activityId: varchar('activity_id', { length: 21 })
    .notNull()
    .references(() => activity.id, { onDelete: 'cascade' }),

  name: varchar('name', { length: 255 }).notNull(),
  durationMs: integer('duration_ms').notNull(),
  spotifyUrl: varchar('spotify_url', { length: 255 }).notNull(),
  artists: json('artists').$type<Artist[]>(),
  images: json('images').$type<TrackImage[]>(),
  playedAt: timestamp('played_at', { mode: 'date' }).notNull(),

  acousticness: real('acousticness'),
  danceability: real('danceability'),
  energy: real('energy'),
  instrumentalness: real('instrumentalness'),
  key: integer('key'),
  liveness: real('liveness'),
  loudness: real('loudness'),
  mode: integer('mode'),
  speechiness: real('speechiness'),
  tempo: real('tempo'),
  valence: real('valence'),
});

export type Track = typeof track.$inferSelect;
export type NewTrack = typeof track.$inferInsert;
