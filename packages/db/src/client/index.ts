import { neon, Pool } from '@neondatabase/serverless';
import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePool } from 'drizzle-orm/neon-serverless';

import * as schema from '../schema';

export const createDb = (databaseUrl: string) => {
  return drizzleHttp(neon(databaseUrl), { schema });
};

export const createPoolDb = (databaseUrl: string) => {
  return drizzlePool(new Pool({ connectionString: databaseUrl }), { schema });
};

export type Database = ReturnType<typeof createDb>;
export type PoolDatabase = ReturnType<typeof createPoolDb>;
export type Schema = typeof schema;
