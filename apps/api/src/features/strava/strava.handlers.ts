import { athleteQueries } from '@tempo-sync/db';

import { stravaAPI } from './api';

import { resetToken } from '@/shared/lib';
import type { AppContext } from '@/shared/types/bindings';

export const getAllActivitesCount = async (c: AppContext) => {
  const db = c.get('db');

  const token = await resetToken({ db, env: c.env, provider: 'strava' });
  const [{ stravaProfileId }] = await athleteQueries.getAthleteProfile({ db });

  const stats = await stravaAPI.getStats(stravaProfileId, token);

  return c.json({ count: stats.all_run_totals.count });
};
