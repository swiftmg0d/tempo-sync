import type { AppContext } from '@/shared/types/bindings';
import { syncQueries } from '@tempo-sync/db';
import { formatDateDistance } from '@tempo-sync/shared/utils';

export const getSyncStatus = async (c: AppContext) => {
  const db = c.get('db');

  const [syncStatus] = await syncQueries.getLastSyncTime(db);

  if (!syncStatus) {
    return c.json({ status: 'No syncs have been performed yet.' });
  }

  return c.json({ status: formatDateDistance(syncStatus.date) });
};
