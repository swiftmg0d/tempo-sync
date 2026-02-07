import type { TokenProvider } from '@tempo-sync/db';
import { refreshToken } from '@tempo-sync/shared/api';
import type { RefreshTokenRequestParams } from '@tempo-sync/shared/types';

export const syncToken = async (provider: TokenProvider, request: RefreshTokenRequestParams) => {
  const mapFn = {
    spotify: refreshToken.spotify,
    strava: refreshToken.strava,
  };

  return await mapFn[provider].refreshToken({ request });
};
