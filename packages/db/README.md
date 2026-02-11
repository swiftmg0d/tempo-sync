# @tempo-sync/db

Drizzle ORM layer for Tempo-Sync. Schema, relations, queries, and migrations for Neon serverless PostgreSQL.

## Tables

`athlete` · `activity` · `activity-summary` · `activity-map` · `track` · `profile` · `token` · `sync`

## Scripts

```bash
pnpm db:generate    # Generate migrations from schema
pnpm db:migrate     # Run pending migrations
pnpm db:push        # Push schema directly to database
pnpm db:studio      # Launch Drizzle Studio
pnpm check-types    # TypeScript type checking
```

## Environment Variables

| Variable       | Description                  |
| -------------- | ---------------------------- |
| `DATABASE_URL` | PostgreSQL connection string |
