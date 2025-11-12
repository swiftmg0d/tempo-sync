import { defineConfig } from 'drizzle-kit';

import { DATABASE_URL } from './src/config/env';

export default defineConfig({
  dbCredentials: {
    url: DATABASE_URL!,
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/db/schema',
});
