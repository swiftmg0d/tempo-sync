import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { athlete } from './athlete.table';
import { nanoid } from 'nanoid';

export const tokenTypeEnum = pgEnum('token_type', ['refresh', 'access']);
export const tokenProviderEnum = pgEnum('token_provider', [
  'strava',
  'spotify',
]);

export const token = pgTable('token', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  athleteId: varchar('athlete_id', { length: 21 }).references(
    () => athlete.id,
    {
      onDelete: 'cascade',
    }
  ),

  expiresAt: timestamp('expires_at'),
  provider: tokenProviderEnum().notNull(),
  type: tokenTypeEnum().notNull(),
  value: text().notNull(),
});

export const tokenRelations = relations(token, ({ one }) => ({
  athlete: one(athlete, {
    fields: [token.athleteId],
    references: [athlete.id],
    relationName: 'athlete-token',
  }),
}));

export type Token = typeof token.$inferSelect;
export type NewToken = typeof token.$inferInsert;
export type TokenType = (typeof tokenTypeEnum.enumValues)[number];
export type TokenProvider = (typeof tokenProviderEnum.enumValues)[number];
