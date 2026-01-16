import {
  resyncWithToken,
  analyizeStravaActivityWithLLM,
  saveActivity,
} from './webhook.service';
import type {
  StravaVerifyValidation,
  StravaWebhookValidation,
} from './webhook.schema';
import type { CombinedRefreshTokensRequestParams } from '@/shared/types/token';
import { webhookApi } from './api';
import { decrypt } from '@/shared/utils';
import type { AppEnv } from '@/shared/types';
import type { ValidatedContext, LLMEnv } from '@tempo-sync/shared/types';
import { syncQueries } from '@tempo-sync/db';

export const verifyWebhook = (
  c: ValidatedContext<StravaVerifyValidation, 'query', AppEnv>
) => {
  const {
    'hub.mode': mode,
    'hub.verify_token': token,
    'hub.challenge': challenge,
  } = c.req.valid('query');

  const { VERIFY_TOKEN } = c.env;

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return c.json(
        { messege: 'Webhook verified', 'hub.challenge': challenge },
        200
      );
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

  console.log('Received Webhook Event:', body);

  if (body.updates?.title && !body.updates.title.includes('AI-ASSISTED')) {
    return c.text('No update needed for this activity', 200);
  }

  const request: CombinedRefreshTokensRequestParams = {
    client_id: c.env.SPOTIFY_CLIENT_ID,
    client_secret: c.env.SPOTIFY_CLIENT_SECRET,
    strava_client_id: c.env.STRAVA_CLIENT_ID,
    strava_client_secret: c.env.STRAVA_CLIENT_SECRET,
    grant_type: 'refresh_token',
    key: c.env.KEY,
  };

  const { result: stravaAccessToken } = await resyncWithToken(
    'strava',
    request,
    stravaId,
    c.get('db')
  );
  const { result: spotifyAccessToken } = await resyncWithToken(
    'spotify',
    request,
    stravaId,
    c.get('db')
  );

  const activityId = body.object_id;
  const athleteId = body.owner_id;

  const activity = await webhookApi.strava.fetchActivityById({
    activityId: activityId.toString(),
    accessToken: decrypt(stravaAccessToken, c.env.KEY),
  });

  const LLMEnv: LLMEnv = {
    GEMINI_API_KEY: c.env.GEMINI_API_KEY,
    GROQ_API_KEY: c.env.GROQ_API_KEY,
    OPENROUTER_API_KEY: c.env.OPENROUTER_API_KEY,
  };

  const { updatedActivity, activityInsight } =
    await analyizeStravaActivityWithLLM(
      activity,
      decrypt(stravaAccessToken, c.env.KEY),
      LLMEnv
    );

  const { message, success } = await saveActivity(
    updatedActivity,
    c.get('db'),
    activityInsight
  );

  await syncQueries.updateLastSyncTime(c.get('db'), new Date());

  return c.json({ message, success }, 200);
};
