import { incrementDateBySeconds } from '@tempo-sync/shared';
import type {
  ValidatedContext,
  CombinedRefreshTokensRequestParams,
} from '@tempo-sync/shared/types';

import { webhookApi } from './api';
import type { StravaVerifyValidation, StravaWebhookValidation } from './webhook.schema';
import {
  resyncWithToken,
  handleStravaWebhook,
  getRecentlyPlayedSongsDuringActivity,
  generateTrackLeaderboard,
} from './webhook.service';

import type { AppEnv } from '@/shared/types';

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
  const stravaActivityId = body.object_id;
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
    stravaActivityId: stravaActivityId.toString(),
    accessToken: stravaAccessToken,
  });

  const startDate = new Date(activity.start_date);
  const endDate = incrementDateBySeconds(activity.elapsed_time, new Date(startDate));

  const activityId = await handleStravaWebhook({
    db,
    activity,
    accessToken: stravaAccessToken,
    env: c.env,
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
      GEMINI_API_KEY: c.env.GEMINI_API_KEY,
      GROQ_API_KEY: c.env.GROQ_API_KEY,
      OPENROUTER_API_KEY: c.env.OPENROUTER_API_KEY,
      CEREBRAS_API_KEY: c.env.CEREBRAS_API_KEY,
      SAMBANOVA_API_KEY: c.env.SAMBANOVA_API_KEY,
    },
  });

  return c.text('Webhook event handled', 200);
};
