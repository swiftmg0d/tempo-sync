import type { Next } from 'hono';
import type { AppEnv } from '../types';
import type { ValidatedContext } from '@tempo-sync/shared';
import type { StravaWebhookValidation } from '@/features/webhook/webhook.schema';

export const subscriptionMiddleware = (
  c: ValidatedContext<StravaWebhookValidation, 'json', AppEnv>,
  next: Next
) => {
  const body = c.req.valid('json');

  const subscriptionIdFromBody = body.subscription_id;

  if (subscriptionIdFromBody !== Number(c.env.SUBSCRIPTION_ID)) {
    return c.json({ message: 'Unauthorized subscription ID' }, 401);
  }

  return next();
};
