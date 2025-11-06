import axios from 'axios';
import dotenv from 'dotenv';
import { and, eq } from 'drizzle-orm';

import { STRAVA_TOKEN_URI } from '@/config/constants';
import { db } from '@/db';
import { token, TokenInsertType } from '@/db/schema';
import { TokenResponse } from '@/types/auth.type';
import { decrypt, encrypt } from '@/utils/crypt.utils';
import { incrementDateBySeconds } from '@/utils/date.utils';

dotenv.config();

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;

export const saveToken = async (tokenData: TokenInsertType) => {
  const { athleteId, expiresAt, provider, type, value } = tokenData;

  await db.insert(token).values({
    athleteId: athleteId,
    expiresAt: expiresAt,
    provider: provider,
    type: type,
    value: encrypt(value),
  });
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
    return {
      message: 'Failed to update the token!',
      success: false,
    };
  }
};

export const findTokensByProvider = async (provider: 'spotify' | 'strava') => {
  try {
    const tokens = await db
      .select()
      .from(token)
      .where(and(eq(token.provider, provider)));

    return {
      result: tokens,
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Failed to fetch tokens!',
      result: [],
      success: false,
    };
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

    return {
      message: 'Token is successfully refreshed!',
      result: data,
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Failed to refresh token securely!',
      result: {},
      success: false,
    };
  }
};

export const verifyToken = async (tokenType: 'spotify' | 'strava') => {
  const { message, result, success } = await findTokensByProvider(tokenType);

  if (!success) {
    console.error(message);
    return {
      message,
      success,
    };
  }

  const accesshToken = result.find((token) => token.type === 'access');
  const refreshToken = result.find((token) => token.type === 'refresh');

  if (accesshToken?.expiresAt != null && refreshToken?.value) {
    if (accesshToken.expiresAt < new Date()) {
      const { message, result, success } = await refreshStravaToken(
        refreshToken.value,
      );

      if (!success) {
        console.error(message);
        return {
          message,
          success,
        };
      }
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
        success: true,
      };
    }
    return {
      message: 'Tokens already verified!',
      success: true,
    };
  }
  return {
    message: 'Tokens verification failed!',
    success: false,
  };
};
