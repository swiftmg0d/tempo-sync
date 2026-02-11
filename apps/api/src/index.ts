import { createPoolDb } from '@tempo-sync/db';
import { createApp } from '@tempo-sync/shared/app';
import { corsMiddleware, errorHandler, rateLimiters } from '@tempo-sync/shared/middleware';

import { activity } from './features/activity';
import { athlete } from './features/athlete';
import { spotify } from './features/spotify';
import { strava } from './features/strava';
import { sync } from './features/sync';
import type { AppEnv } from './shared/types/bindings';

const app = createApp<AppEnv>({ enableCors: false });

app.use('*', corsMiddleware<AppEnv>());

app.use('*', rateLimiters.standard<AppEnv>());

app.use('*', async (c, next) => {
  const db = createPoolDb(c.env.DATABASE_URL);
  c.set('db', db);
  await next();
});

app.use('*', async (c, next) => {
  c.header('x-content-type-options', 'nosniff');
  await next();
});

app.route('/api/activity', activity);
app.route('/api/athlete', athlete);
app.route('/api/sync', sync);
app.route('/api/spotify', spotify);
app.route('/api/strava', strava);

app.notFound((c) => c.json({ message: 'Not Found' }, 404));
app.onError(errorHandler);

export default app;
