import { Hono, type Env } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

export const createApp = <T extends Env>() => {
  const app = new Hono<T>();

  app.use(logger());
  app.use('*', cors());

  app.get('/health', c => {
    return c.json({ status: 'ok', timestamp: Date.now() }, 200);
  });

  return app;
};
