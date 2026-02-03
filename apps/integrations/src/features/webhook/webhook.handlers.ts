import { syncQueries, athleteQueries } from '@tempo-sync/db';
import type {
  ValidatedContext,
  LLMEnv,
  CombinedRefreshTokensRequestParams,
} from '@tempo-sync/shared/types';

import { webhookApi } from './api';
import type { StravaVerifyValidation, StravaWebhookValidation } from './webhook.schema';
import { resyncWithToken, analyizeStravaActivityWithLLM, saveActivity } from './webhook.service';

import type { AppEnv } from '@/shared/types';
import { decrypt } from '@tempo-sync/shared';

export const verifyWebhook = (c: ValidatedContext<StravaVerifyValidation, 'query', AppEnv>) => {
  const {
    'hub.mode': mode,
    'hub.verify_token': token,
    'hub.challenge': challenge,
  } = c.req.valid('query');

  const { VERIFY_TOKEN } = c.env;

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return c.json({ messege: 'Webhook verified', 'hub.challenge': challenge }, 200);
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
  const stravaId = body.owner_id;

  console.log('Received Strava webhook event:', body);

  if (body.updates?.title && !body.updates.title.includes('AI-ASSISTED')) {
    return c.text('No update needed for this activity', 200);
  }

  const db = c.get('db');

  const findAthlete = athleteQueries.findAthleteByStravaId(db);
  const [{ id }] = await findAthlete({ stravaId });

  const request: CombinedRefreshTokensRequestParams = {
    client_id: c.env.SPOTIFY_CLIENT_ID,
    client_secret: c.env.SPOTIFY_CLIENT_SECRET,
    strava_client_id: c.env.STRAVA_CLIENT_ID,
    strava_client_secret: c.env.STRAVA_CLIENT_SECRET,
    grant_type: 'refresh_token',
    key: c.env.KEY,
  };

  const { result: stravaAccessToken } = await resyncWithToken('strava', request, stravaId, db);

  // const { result: spotifyAccessToken } = await resyncWithToken(
  //   'spotify',
  //   request,
  //   stravaId,
  //   c.get('db')
  // );

  const activityId = body.object_id;
  const athleteId = body.owner_id;

  const activity = await webhookApi.strava.fetchActivityById({
    activityId: activityId.toString(),
    accessToken: stravaAccessToken,
  });

  const LLMEnv: LLMEnv = {
    GEMINI_API_KEY: c.env.GEMINI_API_KEY,
    GROQ_API_KEY: c.env.GROQ_API_KEY,
    OPENROUTER_API_KEY: c.env.OPENROUTER_API_KEY,
    CEREBRAS_API_KEY: c.env.CEREBRAS_API_KEY,
    SAMBANOVA_API_KEY: c.env.SAMBANOVA_API_KEY,
  };

  const { updatedActivity, activityInsight } = await analyizeStravaActivityWithLLM(
    activity,
    stravaAccessToken,
    LLMEnv
  );

  const { message, success } = await saveActivity(updatedActivity, c.get('db'), activityInsight);

  await syncQueries.updateLastSyncTime(db, new Date());

  return c.json({ message, success }, 200);
};
