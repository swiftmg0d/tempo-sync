import { integer, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { tempoSyncSchema } from './schema';

export const athlete = tempoSyncSchema.table('athlete', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  stravaProfileId: integer('strava_profile_id').notNull().unique(),

  city: varchar({ length: 255 }),
  country: varchar({ length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  profilePhoto: varchar('profile_photo', { length: 255 }),
});

export type Athlete = typeof athlete.$inferSelect;
export type NewAthlete = typeof athlete.$inferInsert;
