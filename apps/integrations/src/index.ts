import { createPoolDb } from '@tempo-sync/db';
import { createApp } from '@tempo-sync/shared/app';
import { corsMiddleware, errorHandler, rateLimiters } from '@tempo-sync/shared/middleware';

import { auth, webhook } from './features';
import { processWebhookEvent } from './features/webhook/queue.consumer';
import type { StravaWebhookEvent } from './features/webhook/webhook.schema';
import type { AppEnv, Bindings } from './shared/types';

const app = createApp<AppEnv>({ enableCors: false });

app.use('*', corsMiddleware<AppEnv>());

app.use('*', rateLimiters.standard<AppEnv>());

app.use('*', async (c, next) => {
  const db = createPoolDb(c.env.DATABASE_URL);
  c.set('db', db);
  await next();
});

app.route('/api/webhook', webhook);
app.route('/api/auth', auth);

app.notFound((c) => c.json({ message: 'Not Found' }, 404));
app.onError(errorHandler);

export default {
  fetch: app.fetch,
  async queue(batch: MessageBatch<StravaWebhookEvent>, env: Bindings) {
    for (const message of batch.messages) {
      try {
        await processWebhookEvent(message.body, env);
        message.ack();
      } catch (e) {
        console.error('Queue consumer failed for message:', message.id, e);
        message.retry();
      }
    }
  },
};
