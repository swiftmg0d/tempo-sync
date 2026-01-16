import { incrementDateBySeconds } from '@/shared/utils';
import type {
  SpotifyTokenResponse,
  StravaTokenResponse,
} from '@/shared/types/token';
import { athlete, DrizzleQueryError, token, eq } from '@tempo-sync/db';
import { encrypt } from '@/shared/utils/crypto';
import type { PoolDatabase } from '@tempo-sync/db/client';
import { DatabaseError } from '@tempo-sync/shared/errors';

export const saveProfile = async (
  response: StravaTokenResponse,
  key: string,
  db: PoolDatabase
) => {
  try {
    const { city, country, firstname, id, lastname, profile } =
      response.athlete;
    const { access_token, expires_in, refresh_token } = response;

    const expiresAt = incrementDateBySeconds(expires_in);

    return await db.transaction(async tx => {
      const [athleteProfile] = await tx
        .insert(athlete)
        .values({
          city: city,
          country: country,
          firstName: firstname,
          lastName: lastname,
          profilePhoto: profile,
          stravaProfileId: id,
        })
        .returning();

      await tx.insert(token).values({
        athleteId: athleteProfile.id,
        expiresAt: expiresAt,
        provider: 'strava',
        type: 'access',
        value: encrypt(access_token, key),
      });

      await tx.insert(token).values({
        athleteId: athleteProfile.id,
        provider: 'strava',
        type: 'refresh',
        value: encrypt(refresh_token, key),
      });

      return athleteProfile.id!;
    });
  } catch (e) {
    if (e instanceof DrizzleQueryError) {
      const cause = e.cause as { code?: string };
      const message =
        cause.code === '23505'
          ? 'Strava profile already exists!'
          : 'Database error occurred while saving profile';

      const status = cause.code === '23505' ? 409 : 500;

      throw new DatabaseError(status, message);
    }
    throw e;
  }
};

export const syncProfileWithSpotify = async (
  response: SpotifyTokenResponse,
  profileId: string,
  key: string,
  db: PoolDatabase
) => {
  const { access_token, expires_in, refresh_token } = response;

  const expiresAt = incrementDateBySeconds(expires_in);

  try {
    await db.transaction(async tx => {
      const [{ id }] = await tx
        .select({
          id: athlete.id,
        })
        .from(athlete)
        .where(eq(athlete.id, profileId));

      await tx.insert(token).values({
        athleteId: id,
        expiresAt: expiresAt,
        provider: 'spotify',
        type: 'access',
        value: encrypt(access_token, key),
      });

      await tx.insert(token).values({
        athleteId: id,
        provider: 'spotify',
        type: 'refresh',
        value: encrypt(refresh_token, key),
      });
    });

    return {
      message: 'Succesfully synced with Spotify!',
      success: true,
    };
  } catch (e) {
    console.error(e);

    throw new DatabaseError(
      500,
      'Database error occurred while syncing with Spotify!'
    );
  }
};
