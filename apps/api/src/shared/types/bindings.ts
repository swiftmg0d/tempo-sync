import type { PoolDatabase } from '@tempo-sync/db/client';
import type { Context, Handler } from 'hono';

export interface Bindings {
  DATABASE_URL: string;
  KEY: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  STRAVA_CLIENT_ID: string;
  STRAVA_CLIENT_SECRET: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMITER: RateLimit;
}

export interface Variables {
  db: PoolDatabase;
}

export interface AppEnv {
  Bindings: Bindings;
  Variables: Variables;
}

export type AppContext = Context<AppEnv>;
export type AppHandler = Handler<AppEnv>;
