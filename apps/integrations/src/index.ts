import type { AppEnv } from './shared/types';
import { auth, webhook } from './features';
import { errorHandler } from '@tempo-sync/shared/middleware';
import { createApp } from '@tempo-sync/shared/app';
import { createPoolDb } from '@tempo-sync/db';

const app = createApp<AppEnv>();

app.use('*', async (c, next) => {
  const db = createPoolDb(c.env.DATABASE_URL);
  c.set('db', db);
  await next();
});

app.route('/api/webhook', webhook);
app.route('/api/auth', auth);

app.notFound(c => c.json({ message: 'Not Found' }, 404));
app.onError(errorHandler);

export default app;
