import { DatabaseError as DbError } from '@neondatabase/serverless';
import { DrizzleQueryError, eq } from 'drizzle-orm';

import { db } from '@/db';
import { athlete } from '@/db/schema';
import { DatabaseError } from '@/errors';
import { SpotifyAuthResponse, StravaAuthResponse } from '@/types/auth.type';
import { incrementDateBySeconds } from '@/utils/date.utils';

import { saveToken } from '../token/token.service';

export const saveProfile = async (
  profile: StravaAuthResponse,
): Promise<{
  id?: number;
  message: string;
  redirect?: boolean;
  success: boolean;
}> => {
  try {
    const { city, country, firstname, id, lastname } = profile.athlete;
    const { access_token, expires_in, refresh_token } = profile;

    const expiresAt = incrementDateBySeconds(expires_in);

    const [stravaProfile] = await db
      .insert(athlete)
      .values({
        city: city,
        country: country,
        firstName: firstname,
        lastName: lastname,
        stravaProfileId: id,
      })
      .returning();

    saveToken({
      athleteId: stravaProfile.id,
      expiresAt: expiresAt,
      provider: 'strava',
      type: 'access',
      value: access_token,
    });

    saveToken({
      athleteId: stravaProfile.id,
      provider: 'strava',
      type: 'refresh',
      value: refresh_token,
    });

    return {
      id: stravaProfile.stravaProfileId,
      message: 'Succesfully saved a profile!',
      success: true,
    };
  } catch (e) {
    if (e instanceof DrizzleQueryError) {
      const cause = e.cause as DbError;

      if (cause.code === '23505') {
        console.error(e);

        return {
          message: 'User already exists!',
          redirect: true,
          success: false,
        };
      }
    }
    console.error(e);
    throw new DatabaseError('Failed to save the profile!');
  }
};

export const syncWithSpotify = async (
  spotifyToken: SpotifyAuthResponse,
  stravaId: number,
) => {
  try {
    const result = await db
      .select({
        id: athlete.id,
      })
      .from(athlete)
      .where(eq(athlete.stravaProfileId, stravaId));

    const { id } = result[0];

    const { access_token, expires_in, refresh_token } = spotifyToken;

    const expiresAt = incrementDateBySeconds(expires_in);

    saveToken({
      athleteId: id,
      provider: 'spotify',
      type: 'refresh',
      value: refresh_token,
    });

    saveToken({
      athleteId: id,
      expiresAt: expiresAt,
      provider: 'spotify',
      type: 'access',
      value: access_token,
    });

    return {
      message: 'Succesfully synced with Spotify!',
      success: true,
    };
  } catch (e) {
    console.error(e);

    throw new DatabaseError('Failed to sync with Spotify!');
  }
};
