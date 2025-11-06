import axios from 'axios';
import dotenv from 'dotenv';
import { and, eq } from 'drizzle-orm';

import { STRAVA_TOKEN_URI } from '@/config/constants';
import { db } from '@/db';
import { token, TokenInsertType } from '@/db/schema';
import { DatabaseError, FetchError } from '@/errors';
import { TokenResponse } from '@/types/auth.type';
import { decrypt, encrypt } from '@/utils/crypt.utils';
import { incrementDateBySeconds } from '@/utils/date.utils';

dotenv.config();

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;

export const saveToken = async (tokenData: TokenInsertType) => {
  try {
    const { athleteId, expiresAt, provider, type, value } = tokenData;

    await db.insert(token).values({
      athleteId: athleteId,
      expiresAt: expiresAt,
      provider: provider,
      type: type,
      value: encrypt(value),
    });
    return {
      message: 'Successfully saved the token!',
      success: true,
    };
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Failed to save token');
  }
};

export const updateTokenById = async (data: {
  expiresAt: Date | null;
  id: number;
  value: string;
}) => {
  try {
    const { expiresAt, id, value } = data;

    await db
      .update(token)
      .set({
        expiresAt,
        value,
      })
      .where(eq(token.id, id));
    return {
      message: 'Successfully updated the token!',
      success: true,
    };
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Failed to update the token!');
  }
};

export const findTokensByProvider = async (provider: 'spotify' | 'strava') => {
  try {
    const tokens = await db
      .select()
      .from(token)
      .where(and(eq(token.provider, provider)));

    return tokens;
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Failed to retrieve tokens by provider');
  }
};

const refreshStravaToken = async (value: string) => {
  try {
    const { data } = await axios.post<unknown, { data: TokenResponse }>(
      STRAVA_TOKEN_URI,
      {
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: decrypt(value),
      },
    );

    return data;
  } catch (e) {
    console.error(e);
    throw new FetchError('Failed to refresh token securely!');
  }
};

export const verifyToken = async (tokenType: 'spotify' | 'strava') => {
  const tokens = await findTokensByProvider(tokenType);

  const accesshToken = tokens.find((token) => token.type === 'access');
  const refreshToken = tokens.find((token) => token.type === 'refresh');

  if (accesshToken?.expiresAt != null && refreshToken?.value) {
    if (accesshToken.expiresAt < new Date()) {
      const result = await refreshStravaToken(refreshToken.value);

      const { access_token, expires_in, refresh_token } =
        result as TokenResponse;

      updateTokenById({
        ...accesshToken,
        expiresAt: incrementDateBySeconds(expires_in),
        value: encrypt(access_token),
      });

      updateTokenById({
        ...refreshToken,
        value: encrypt(refresh_token),
      });

      return {
        message: 'Tokens succesfully verified!',
        result: encrypt(access_token),
        success: true,
      };
    }
    return {
      message: 'Tokens already verified!',
      result: accesshToken.value,
      success: true,
    };
  }
  return {
    message: 'Tokens verification failed!',
    result: null,
    success: false,
  };
};
