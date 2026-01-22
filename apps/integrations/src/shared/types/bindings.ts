import type { PoolDatabase } from '@tempo-sync/db/client';
import type { Context, Handler } from 'hono';

export interface Bindings {
  VERIFY_TOKEN: string;

  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REDIRECT_URL: string;
  SPOTIFY_SCOPE: string;

  STRAVA_CLIENT_ID: string;
  STRAVA_CLIENT_SECRET: string;
  STRAVA_SCOPE: string;
  STRAVA_REDIRECT_URL: string;

  KEY: string;

  DATABASE_URL: string;

  GEMINI_API_KEY: string;
  GROQ_API_KEY: string;
  OPENROUTER_API_KEY: string;
  SAMBANOVA_API_KEY: string;
  CEREBRAS_API_KEY: string;

  X_API_KEY: string;
  SUBSCRIPTION_ID: number;
}

export interface Variables {
  db: PoolDatabase;
  profileId?: number;
}

export interface AppEnv {
  Bindings: Bindings;
  Variables: Variables;
}

export type AppContext = Context<AppEnv>;
export type AppHandler = Handler<AppEnv>;
