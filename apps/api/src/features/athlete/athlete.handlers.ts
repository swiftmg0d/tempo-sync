import type { AppContext } from '@/shared/types/bindings';
import { DatabaseError } from '@tempo-sync/shared/errors';
import { athlete } from './athlete.routes';
import { athleteQueries } from '@tempo-sync/db';

export const getAthlete = async (c: AppContext) => {
  try {
    const db = c.get('db');

    const [athlete] = await athleteQueries.getAthleteProfile({ db });

    return c.json({ athlete });
  } catch (error) {
    console.error('Error fetching athlete profile:', error);
    throw new DatabaseError(500, 'Failed to fetch athlete profile.');
  }
};
