# @tempo-sync/api

Hono API service running on Cloudflare Workers. Serves activity data, athlete profiles, sync status, and LLM-powered insights.

## Routes

- `/api/activity` — Activity data, summaries, streams, highlights, leaderboards, recommendations, insights
- `/api/athlete` — Current athlete profile and connected profiles
- `/api/sync` — Synchronization status
- `/api/spotify` — Spotify data (top artists)
- `/api/strava` — Strava data (activity counts)

## Scripts

```bash
pnpm dev            # Start dev server (localhost:3000)
pnpm build          # Build for production
pnpm deploy         # Deploy to Cloudflare Workers
pnpm cf-typegen     # Generate Cloudflare Worker types
pnpm check-types    # TypeScript type checking
pnpm lint           # Run ESLint
```

## Environment Variables

| Variable                | Description                  |
| ----------------------- | ---------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string |
| `KEY`                   | Application secret key       |
| `SPOTIFY_CLIENT_ID`     | Spotify OAuth client ID      |
| `SPOTIFY_CLIENT_SECRET` | Spotify OAuth client secret  |
| `STRAVA_CLIENT_ID`      | Strava OAuth client ID       |
| `STRAVA_CLIENT_SECRET`  | Strava OAuth client secret   |
| `ALLOWED_ORIGINS`       | Comma-separated CORS origins |
