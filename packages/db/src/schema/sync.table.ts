import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const sync = pgTable('sync', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  date: timestamp().notNull().defaultNow(),
});

export type Sync = typeof sync.$inferSelect;
export type NewSync = typeof sync.$inferInsert;
