import type { AppEnv } from './shared/types/bindings';
import { activity } from './features/activity';
import { createApp } from '@tempo-sync/shared/app';
import { errorHandler } from '@tempo-sync/shared/middleware';
import { sync } from './features/sync';
import { athlete } from './features/athlete';
import { createPoolDb } from '@tempo-sync/db';

const app = createApp<AppEnv>();

app.use('*', async (c, next) => {
  const db = createPoolDb(c.env.DATABASE_URL);
  c.set('db', db);
  await next();
});

app.route('/api/activity', activity);
app.route('/api/athlete', athlete);
app.route('/api/sync', sync);

app.notFound(c => c.json({ message: 'Not Found' }, 404));
app.onError(errorHandler);

export default app;
