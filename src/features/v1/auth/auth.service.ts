import { DatabaseError } from '@neondatabase/serverless';
import axios from 'axios';
import dotenv from 'dotenv';
import { DrizzleQueryError, eq } from 'drizzle-orm';

import { SPOTFIY_TOKEN_URI, STRAVA_TOKEN_URI } from '@/config/constants';
import { db } from '@/db';
import { athlete } from '@/db/schema';
import { SpotifyAuthResponse, StravaAuthResponse } from '@/types/auth.type';
import { incrementDateBySeconds } from '@/utils/date.utils';

import { saveToken } from '../token/token.service';

dotenv.config();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} = process.env;

export const fetchSpotifyAccessToken = async (
  code: string,
): Promise<SpotifyAuthResponse> => {
  const authHeader = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString(
    'base64',
  );

  const response = await axios.post<unknown, { data: SpotifyAuthResponse }>(
    SPOTFIY_TOKEN_URI,
    {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    },
    {
      headers: {
        Authorization: 'Basic ' + authHeader,
        'content-type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data;
};

export const fetchStravaAcessToken = async (
  code: string,
): Promise<StravaAuthResponse> => {
  const response = await axios.post<unknown, { data: StravaAuthResponse }>(
    STRAVA_TOKEN_URI,
    {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    },
  );

  return response.data;
};

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
      const cause = e.cause as DatabaseError;

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

    return {
      message: 'Failed to save profile!',
      success: false,
    };
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

    return {
      message: 'Failed to sync with Spotify!',
      success: true,
    };
  }
};
