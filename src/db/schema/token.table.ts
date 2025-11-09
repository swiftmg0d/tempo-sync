import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { athlete } from '.';

export const tokenTypeEnum = pgEnum('token_type', ['refresh', 'access']);
export const tokenProviderEnum = pgEnum('token_provider', [
  'strava',
  'spotify',
]);

export const token = pgTable('token', {
  athleteId: integer('athlete_id').references(() => athlete.id, {
    onDelete: 'cascade',
  }),
  expiresAt: timestamp('expires_at'),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  provider: tokenProviderEnum().notNull(),
  type: tokenTypeEnum().notNull(),
  value: text().notNull(),
});

export const tokenRelations = relations(token, ({ one }) => ({
  athlete: one(athlete, {
    fields: [token.athleteId],
    references: [athlete.id],
  }),
}));
