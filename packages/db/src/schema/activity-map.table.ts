import { relations } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

import { activity } from './activity.table';

export const activityMap = pgTable('activity_map', {
  id: varchar('id', { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  mapId: varchar('map_id', { length: 255 }),
  activityId: varchar('activity_id', { length: 21 }).references(
    () => activity.id,

    {
      onDelete: 'cascade',
    }
  ),

  polyline: text(),
  summaryPolyline: text('summary_polyline'),
});

export const activityMapRelations = relations(activityMap, ({ one }) => ({
  activity: one(activity, {
    fields: [activityMap.activityId],
    references: [activity.id],
    relationName: 'activity-map',
  }),
}));

export type ActivityMap = typeof activityMap.$inferSelect;
export type NewActivityMap = typeof activityMap.$inferInsert;
