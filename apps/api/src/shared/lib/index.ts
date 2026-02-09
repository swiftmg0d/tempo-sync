import { decode } from '@mapbox/polyline';
import {
  athleteQueries,
  type PoolDatabase,
  type TokenProvider,
  tokenQueries,
} from '@tempo-sync/db';
import {
  decrypt,
  encrypt,
  FetchError,
  incrementDateBySeconds,
  type RefreshTokenRequestParams,
} from '@tempo-sync/shared';
import { refreshToken } from '@tempo-sync/shared/api';

import type { Bindings } from '../types/bindings';

export const decodeActivityMap = (polyline: null | string) => {
  if (!polyline) return null;

  return decode(polyline).map(([lat, lng]) => [lng, lat]);
};

export const resetToken = async ({
  db,
  env,
  provider,
}: {
  db: PoolDatabase;
  env: Bindings;
  provider: TokenProvider;
}): Promise<string> => {
  try {
    const [{ id }] = await athleteQueries.getAthleteProfile({ db });

    const [{ value: oldAccessToken, expiresAt }] = await tokenQueries.findTokenByProviderAndId(db)({
      provider,
      id: id,
      type: 'access',
    });

    if (expiresAt && expiresAt < new Date()) {
      const [{ value: refresh_token }] = await tokenQueries.findTokenByProviderAndId(db)({
        provider,
        id: id,
        type: 'refresh',
      });

      const request: RefreshTokenRequestParams = {
        grant_type: 'refresh_token',
        refresh_token: decrypt(refresh_token, env.KEY),
        client_id: provider === 'strava' ? env.STRAVA_CLIENT_ID : env.SPOTIFY_CLIENT_ID,
        client_secret: provider === 'strava' ? env.STRAVA_CLIENT_SECRET : env.SPOTIFY_CLIENT_SECRET,
      };

      const refreshTokenMapFn = {
        strava: refreshToken.strava,
        spotify: refreshToken.spotify,
      };

      const {
        access_token,
        expires_in,
        refresh_token: newRefreshToken,
      } = await refreshTokenMapFn[provider].refreshToken({
        request,
      });

      const [{ value: newAccessToken }] = await tokenQueries.updateTokenById({
        db,
        id: id,
        tokenData: {
          athleteId: id,
          provider: provider,
          type: 'access',
          value: encrypt(access_token, env.KEY),
          expiresAt: incrementDateBySeconds(expires_in),
        },
      });

      if (newRefreshToken) {
        await tokenQueries.updateTokenById({
          db,
          id: id,
          tokenData: {
            athleteId: id,
            provider: provider,
            type: 'refresh',
            value: encrypt(newRefreshToken, env.KEY),
          },
        });
      }

      return decrypt(newAccessToken, env.KEY);
    }

    return decrypt(oldAccessToken, env.KEY);
  } catch {
    throw new FetchError(400, 'Failed to reset token');
  }
};
