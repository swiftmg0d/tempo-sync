import type { PoolDatabase } from '@tempo-sync/db/client';
import type { Context, Handler } from 'hono';

export type Bindings = {
  DATABASE_URL: string;
};

export type Variables = {
  db: PoolDatabase;
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};

export type AppContext = Context<AppEnv>;
export type AppHandler = Handler<AppEnv>;
