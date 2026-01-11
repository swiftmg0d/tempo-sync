import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const sync = pgTable('sync', {
	date: timestamp().notNull().defaultNow(),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
