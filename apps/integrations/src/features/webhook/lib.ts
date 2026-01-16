import type { TokenProvider } from '@tempo-sync/db';

import { webhookApi } from './api';

import type { RefreshTokenRequestParams } from '@/shared/types/token';

export const syncToken = async (provider: TokenProvider, request: RefreshTokenRequestParams) => {
  const mapFn = {
    spotify: webhookApi.spotify.refreshToken,
    strava: webhookApi.strava.refreshToken,
  };

  return await mapFn[provider]({
    request,
  });
};
