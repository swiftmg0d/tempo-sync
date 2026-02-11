# @tempo-sync/integrations

Hono integration service running on Cloudflare Workers. Handles OAuth flows for Strava and Spotify, and processes Strava webhooks for real-time activity ingestion.

## Routes

- `/api/auth` — OAuth login and callback for Strava and Spotify
- `/api/webhook` — Strava webhook for real-time activity updates

## Scripts

```bash
pnpm dev            # Start dev server (localhost:3100)
pnpm build          # Build for production
pnpm deploy         # Deploy to Cloudflare Workers
pnpm cf-typegen     # Generate Cloudflare Worker types
pnpm check-types    # TypeScript type checking
pnpm lint           # Run ESLint
```

## Environment Variables

| Variable                | Description                       |
| ----------------------- | --------------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string      |
| `KEY`                   | Application secret key            |
| `VERIFY_TOKEN`          | Strava webhook verification token |
| `SPOTIFY_CLIENT_ID`     | Spotify OAuth client ID           |
| `SPOTIFY_CLIENT_SECRET` | Spotify OAuth client secret       |
| `SPOTIFY_REDIRECT_URL`  | Spotify OAuth redirect URI        |
| `STRAVA_CLIENT_ID`      | Strava OAuth client ID            |
| `STRAVA_CLIENT_SECRET`  | Strava OAuth client secret        |
| `STRAVA_REDIRECT_URL`   | Strava OAuth redirect URI         |
| `GROQ_API_KEY`          | Groq LLM API key                  |
| `OPENROUTER_API_KEY`    | OpenRouter API key                |
| `SAMBANOVA_API_KEY`     | SambaNova API key                 |
| `CEREBRAS_API_KEY`      | Cerebras API key                  |
| `ALLOWED_ORIGINS`       | Comma-separated CORS origins      |
