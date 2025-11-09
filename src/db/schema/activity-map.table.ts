import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { activity } from '@/db/schema/activity.table';

export const activityMap = pgTable('activity_map', {
  acitvityId: bigint('activity_id', { mode: 'bigint' }).references(
    () => activity.id,
    {
      onDelete: 'cascade',
    },
  ),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mapId: varchar('map_id', { length: 255 }),
  polyline: text(),
  summaryPolyline: text(),
});

export const activityMapRelations = relations(activityMap, ({ one }) => ({
  activity: one(activity, {
    fields: [activityMap.acitvityId],
    references: [activity.id],
  }),
}));
