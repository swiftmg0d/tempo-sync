import { text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { athlete } from './athlete.table';
import { tempoSyncSchema } from './schema';

export const tokenTypeEnum = tempoSyncSchema.enum('token_type', ['refresh', 'access']);
export const tokenProviderEnum = tempoSyncSchema.enum('token_provider', ['strava', 'spotify']);

export const token = tempoSyncSchema.table('token', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  athleteId: varchar('athlete_id', { length: 21 }).references(() => athlete.id, {
    onDelete: 'cascade',
  }),

  expiresAt: timestamp('expires_at'),
  provider: tokenProviderEnum().notNull(),
  type: tokenTypeEnum().notNull(),
  value: text().notNull(),
});

export type Token = typeof token.$inferSelect;
export type NewToken = typeof token.$inferInsert;
export type TokenType = (typeof tokenTypeEnum.enumValues)[number];
export type TokenProvider = (typeof tokenProviderEnum.enumValues)[number];
