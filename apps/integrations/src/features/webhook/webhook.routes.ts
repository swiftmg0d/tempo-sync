import { createRouter } from '@tempo-sync/shared/lib';
import { validate } from '@tempo-sync/shared/middleware';

import * as handlers from './webhook.handlers';
import { stravaVerifySchema, stravaWebhookSchema } from './webhook.schema';

import { subscriptionMiddleware } from '@/shared/middleware/subscription.middleware';
import type { AppEnv } from '@/shared/types/bindings';

const webhook = createRouter<AppEnv>()
  .post(
    '/',
    validate('json', stravaWebhookSchema),
    subscriptionMiddleware,
    handlers.handleWebhookEvent
  )
  .get('/', validate('query', stravaVerifySchema), handlers.verifyWebhook);

export { webhook };
