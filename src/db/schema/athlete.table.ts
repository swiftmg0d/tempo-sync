import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { activity } from './activity.table';
import { token } from './token.table';

export const athlete = pgTable('athlete', {
  city: varchar({ length: 255 }),
  country: varchar({ length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lastName: varchar('last_name', { length: 100 }),
  stravaProfileId: integer('strava_profile_id').notNull().unique(),
});

export const athleteRelations = relations(athlete, ({ many }) => ({
  activities: many(activity, { relationName: 'activities' }),
  tokens: many(token, { relationName: 'tokens' }),
}));
