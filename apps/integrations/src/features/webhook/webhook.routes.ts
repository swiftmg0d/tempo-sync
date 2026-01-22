import { createRouter } from '@tempo-sync/shared/lib';
import { validate } from '@tempo-sync/shared/middleware';

import * as handlers from './webhook.handlers';
import { stravaVerifySchema, stravaWebhookSchema } from './webhook.schema';

import type { AppEnv } from '@/shared/types/bindings';
import { subscriptionMiddleware } from '@/shared/middleware/subscription.middleware';

const webhook = createRouter<AppEnv>()
  .post(
    '/',
    validate('json', stravaWebhookSchema),
    subscriptionMiddleware,
    handlers.handleWebhookEvent
  )
  .get('/', validate('query', stravaVerifySchema), handlers.verifyWebhook);

export { webhook };
