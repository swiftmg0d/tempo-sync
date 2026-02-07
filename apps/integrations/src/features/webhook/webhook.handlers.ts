import { syncQueries, athleteQueries } from '@tempo-sync/db';
import type {
  ValidatedContext,
  LLMEnv,
  CombinedRefreshTokensRequestParams,
} from '@tempo-sync/shared/types';

import { webhookApi } from './api';
import type { StravaVerifyValidation, StravaWebhookValidation } from './webhook.schema';
import {
  resyncWithToken,
  analyizeStravaActivityWithLLM,
  saveActivity,
  getRecentlyPlayedSongsDuringActivity,
  handleStravaWebhook,
} from './webhook.service';

import type { AppEnv } from '@/shared/types';
import {
  decrypt,
  http,
  incrementDateBySeconds,
  SPOTIFY_API_URL,
  STRAVA_API_URL,
} from '@tempo-sync/shared';

export const verifyWebhook = (c: ValidatedContext<StravaVerifyValidation, 'query', AppEnv>) => {
  const {
    'hub.mode': mode,
    'hub.verify_token': token,
    'hub.challenge': challenge,
  } = c.req.valid('query');

  const { VERIFY_TOKEN } = c.env;

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return c.json({ message: 'Webhook verified', 'hub.challenge': challenge }, 200);
    } else {
      return c.text('Forbidden', 403);
    }
  }
  return c.text('Webhook verification failed', 400);
};

export const handleWebhookEvent = async (
  c: ValidatedContext<StravaWebhookValidation, 'json', AppEnv>
) => {
  const body = c.req.valid('json');

  if (body.updates?.title && !body.updates.title.includes('AI-ASSISTED')) {
    return c.text('No update needed for this activity', 200);
  }

  console.log('Received Strava webhook event:', body);

  const stravaId = body.owner_id;
  const activityId = body.object_id;
  const db = c.get('db');

  const request: CombinedRefreshTokensRequestParams = {
    client_id: c.env.SPOTIFY_CLIENT_ID,
    client_secret: c.env.SPOTIFY_CLIENT_SECRET,
    strava_client_id: c.env.STRAVA_CLIENT_ID,
    strava_client_secret: c.env.STRAVA_CLIENT_SECRET,
    grant_type: 'refresh_token',
    key: c.env.KEY,
  };

  const { result: stravaAccessToken } = await resyncWithToken('strava', request, stravaId, db);
  const { result: spotifyAccessToken } = await resyncWithToken('spotify', request, stravaId, db);

  const activity = await webhookApi.strava.fetchActivityById({
    activityId: activityId.toString(),
    accessToken: stravaAccessToken,
  });

  const startDate = new Date(activity.start_date);
  const endDate = incrementDateBySeconds(activity.elapsed_time, new Date(startDate));

  // await getRecentlyPlayedSongsDuringActivity({
  //   accessToken: spotifyAccessToken,
  //   startDate,
  //   endDate,
  // });

  const { message } = await handleStravaWebhook({
    db,
    activity,
    accessToken: stravaAccessToken,
    env: c.env,
  });

  return c.text(message, 200);
};
