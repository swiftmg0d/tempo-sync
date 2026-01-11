import { db } from '@/db';
import { sync } from '@/db/schema';
import { formatDateDistance } from '@/utils/date.utils';

export const checkStatus = async () => {
	const [syncStatus] = await db.select().from(sync);

	return formatDateDistance(syncStatus.date);
};
