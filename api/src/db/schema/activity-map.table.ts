import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { activity } from '@/db/schema/activity.table';

export const activityMap = pgTable('activity_map', {
	activityId: bigint('activity_id', { mode: 'number' }).references(() => activity.id, {
		onDelete: 'cascade',
	}),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	mapId: varchar('map_id', { length: 255 }),
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
