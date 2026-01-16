import { createPoolDb } from '@tempo-sync/db';
import { createApp } from '@tempo-sync/shared/app';
import { errorHandler } from '@tempo-sync/shared/middleware';

import { auth, webhook } from './features';
import type { AppEnv } from './shared/types';

const app = createApp<AppEnv>();

app.use('*', async (c, next) => {
  const db = createPoolDb(c.env.DATABASE_URL);
  c.set('db', db);
  await next();
});

app.route('/api/webhook', webhook);
app.route('/api/auth', auth);

app.notFound((c) => c.json({ message: 'Not Found' }, 404));
app.onError(errorHandler);

export default app;
