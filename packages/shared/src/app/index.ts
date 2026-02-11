import { Hono, type Env } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

export interface AppConfig {
  enableCors?: boolean;
}

export const createApp = <T extends Env>(config?: AppConfig) => {
  const app = new Hono<T>();

  app.use(logger());

  if (config?.enableCors !== false) {
    app.use('*', cors());
  }

  app.get('/health', (c) => {
    return c.json({ status: 'ok', timestamp: Date.now() }, 200);
  });

  return app;
};
