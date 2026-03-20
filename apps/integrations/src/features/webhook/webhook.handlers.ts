import type { ValidatedContext } from '@tempo-sync/shared/types';

import type { StravaVerifyValidation, StravaWebhookValidation } from './webhook.schema';

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

  const shouldProcess =
    body.aspect_type === 'create' ||
    (body.aspect_type === 'update' && body.updates?.title?.includes('AI-ASSISTED'));

  if (!shouldProcess) {
    return c.text('No update needed for this activity', 200);
  }

  await c.env.ACTIVITY_QUEUE.send(body);

  return c.text('Webhook event handled', 200);
};
