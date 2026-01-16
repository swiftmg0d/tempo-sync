import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { athlete } from './athlete.table';

export const profile = pgTable('profile', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  athleteId: varchar('athlete_id', { length: 21 })
    .references(() => athlete.id, { onDelete: 'cascade' })
    .notNull(),

  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
});

export const profileRelations = relations(profile, ({ one }) => ({
  athlete: one(athlete, {
    fields: [profile.athleteId],
    references: [athlete.id],
    relationName: 'athlete-profile',
  }),
}));

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
