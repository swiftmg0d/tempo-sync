import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { athlete } from '@/db/schema';
import { DatabaseError } from '@/errors';

export const findAthleteByStravaId = async (stravaId: number) => {
  try {
    const [athleteProfile] = await db
      .select()
      .from(athlete)
      .where(eq(athlete.stravaProfileId, stravaId));

    return athleteProfile;
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Failed to find athlete by Strava ID!');
  }
};
