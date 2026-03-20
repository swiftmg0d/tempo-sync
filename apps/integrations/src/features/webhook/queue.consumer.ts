import { createPoolDb } from '@tempo-sync/db';
import { incrementDateBySeconds } from '@tempo-sync/shared';
import type { CombinedRefreshTokensRequestParams } from '@tempo-sync/shared/types';

import { webhookApi } from './api';
import type { StravaWebhookEvent } from './webhook.schema';
import {
  generateTrackLeaderboard,
  generateTrackRecommendations,
  getRecentlyPlayedSongsDuringActivity,
  handleStravaWebhook,
  resyncWithToken,
} from './webhook.service';

import type { Bindings } from '@/shared/types/bindings';

export async function processWebhookEvent(event: StravaWebhookEvent, env: Bindings) {
  const db = createPoolDb(env.DATABASE_URL);

  const request: CombinedRefreshTokensRequestParams = {
    client_id: env.SPOTIFY_CLIENT_ID,
    client_secret: env.SPOTIFY_CLIENT_SECRET,
    strava_client_id: env.STRAVA_CLIENT_ID,
    strava_client_secret: env.STRAVA_CLIENT_SECRET,
    grant_type: 'refresh_token',
    key: env.KEY,
  };

  const { result: stravaAccessToken } = await resyncWithToken(
    'strava',
    request,
    event.owner_id,
    db
  );
  const { result: spotifyAccessToken } = await resyncWithToken(
    'spotify',
    request,
    event.owner_id,
    db
  );

  const activity = await webhookApi.strava.fetchActivityById({
    stravaActivityId: event.object_id.toString(),
    accessToken: stravaAccessToken,
  });

  const startDate = new Date(activity.start_date);
  const endDate = incrementDateBySeconds(activity.elapsed_time, new Date(startDate));

  const activityId = await handleStravaWebhook({
    db,
    activity,
    accessToken: stravaAccessToken,
    env,
  });

  await getRecentlyPlayedSongsDuringActivity({
    accessToken: spotifyAccessToken,
    startDate,
    endDate,
    activityId,
    db,
  });

  await generateTrackLeaderboard({
    activityId,
    db,
    env: {
      GROQ_API_KEY: env.GROQ_API_KEY,
      OPENROUTER_API_KEY: env.OPENROUTER_API_KEY,
      CEREBRAS_API_KEY: env.CEREBRAS_API_KEY,
      SAMBANOVA_API_KEY: env.SAMBANOVA_API_KEY,
    },
  });

  await generateTrackRecommendations({
    activityId,
    accessToken: spotifyAccessToken,
    db,
  });
}
