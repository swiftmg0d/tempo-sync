import { text, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { activity } from './activity.table';
import { tempoSyncSchema } from './schema';

export const activityMap = tempoSyncSchema.table('activity_map', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  mapId: varchar('map_id', { length: 255 }),
  activityId: varchar('activity_id', { length: 21 })
    .references(
      () => activity.id,

      {
        onDelete: 'cascade',
      }
    )
    .notNull()
    .unique(),

  polyline: text(),
  summaryPolyline: text('summary_polyline'),
});

export type ActivityMap = typeof activityMap.$inferSelect;
export type NewActivityMap = typeof activityMap.$inferInsert;
