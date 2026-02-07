import { varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { athlete } from './athlete.table';
import { tempoSyncSchema } from './schema';

export const profile = tempoSyncSchema.table('profile', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  athleteId: varchar('athlete_id', { length: 21 })
    .references(() => athlete.id, { onDelete: 'cascade' })
    .notNull(),

  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
});

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
