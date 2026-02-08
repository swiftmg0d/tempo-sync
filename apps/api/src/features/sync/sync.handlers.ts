import { syncQueries } from '@tempo-sync/db';
import { formatDateDistance } from '@tempo-sync/shared/utils';

import type { AppContext } from '@/shared/types/bindings';

export const getSyncStatus = async (c: AppContext) => {
  const db = c.get('db');

  const [syncStatus] = await syncQueries.getLastSyncTime(db);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!syncStatus) {
    return c.json({ status: 'Never' });
  }

  return c.json({ status: formatDateDistance(syncStatus.date) });
};
