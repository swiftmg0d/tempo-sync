import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { activity } from './activity.table';
import { profile } from './profile.table';
import { token } from './token.table';

export const athlete = pgTable('athlete', {
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

export const athleteRelations = relations(athlete, ({ many }) => ({
  activities: many(activity, { relationName: 'activity-athlete' }),
  profiles: many(profile, { relationName: 'athlete-profile' }),
  tokens: many(token, { relationName: 'athlete-token' }),
}));

export type Athlete = typeof athlete.$inferSelect;
export type NewAthlete = typeof athlete.$inferInsert;
