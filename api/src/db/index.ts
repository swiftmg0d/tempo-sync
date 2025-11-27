import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-serverless';

import * as schema from '@/db/schema/index';

neonConfig.webSocketConstructor = undefined;

const getConnectionString = () => {
	return process.env.CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE || process.env.DATABASE_URL;
};

const getDb = () => {
	const pool = new Pool({
		connectionString: getConnectionString(),
	});
	return neonDrizzle(pool, { schema });
};

const db = new Proxy({} as ReturnType<typeof getDb>, {
	get(_, prop) {
		return getDb()[prop as keyof ReturnType<typeof getDb>];
	},
});

export { db, getDb };
