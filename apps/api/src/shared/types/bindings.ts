import type { PoolDatabase } from '@tempo-sync/db/client';
import type { Context, Handler } from 'hono';

export interface Bindings {
  DATABASE_URL: string;
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
