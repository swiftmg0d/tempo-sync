import { createRouter } from '@tempo-sync/shared/lib';
import * as handlers from './webhook.handlers';
import { stravaVerifySchema, stravaWebhookSchema } from './webhook.schema';
import type { AppEnv } from '@/shared/types/bindings';
import { validate } from '@tempo-sync/shared/middleware';

const webhook = createRouter<AppEnv>()
  .post('/', validate('json', stravaWebhookSchema), handlers.handleWebhookEvent)
  .get('/', validate('query', stravaVerifySchema), handlers.verifyWebhook);

export { webhook };
