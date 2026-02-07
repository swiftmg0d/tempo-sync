import { neon, Pool } from '@neondatabase/serverless';
import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePool } from 'drizzle-orm/neon-serverless';

import { relations } from '../relations';
import type * as schema from '../schema';

export const createDb = (databaseUrl: string) => {
  return drizzleHttp({ client: neon(databaseUrl), relations });
};

export const createPoolDb = (databaseUrl: string) => {
  return drizzlePool({ client: new Pool({ connectionString: databaseUrl }), relations });
};

export type Database = ReturnType<typeof createDb>;
export type PoolDatabase = ReturnType<typeof createPoolDb>;
export type AnyDatabase = Database | PoolDatabase;
export type Schema = typeof schema;
export type Relations = typeof relations;
