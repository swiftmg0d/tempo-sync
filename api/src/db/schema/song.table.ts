import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const song = pgTable('song', {
	id: varchar('id', { length: 255 }),
});
