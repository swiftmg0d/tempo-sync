import { activityMap } from '@/db/schema/activity-map.table';
import { activitySummary } from '@/db/schema/activity-summary.table';
import { activity } from '@/db/schema/activity.table';
import { athlete } from '@/db/schema/athlete.table';
import { token } from '@/db/schema/token.table';

import { profile } from './profile.table';
import { sync } from './sync.table';

type ActivitySelectType = typeof activity.$inferSelect;
type ActivitySummarySelectType = typeof activitySummary.$inferSelect;
type TokenInsertType = typeof token.$inferInsert;
type TokenSelectType = typeof token.$inferSelect;

export {
	activity,
	activityMap,
	type ActivitySelectType,
	activitySummary,
	type ActivitySummarySelectType,
	athlete,
	profile,
	sync,
	token,
	type TokenInsertType,
	type TokenSelectType,
};
