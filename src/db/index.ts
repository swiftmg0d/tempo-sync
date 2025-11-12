import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

import { DATABASE_URL } from '@/config/env';
import * as schema from '@/db/schema/index';

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: DATABASE_URL });
const db = neonDrizzle(pool, { schema });

export { db };
