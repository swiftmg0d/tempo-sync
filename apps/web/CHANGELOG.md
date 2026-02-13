# @tempo-sync/web

## 0.1.0

### Minor Changes

- [`bb52147`](https://github.com/swiftmg0d/tempo-sync/commit/bb52147ee7a8851b94ec427c994a18722d09611c) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - ## 0.1.0 — Initial Release

  Full-stack fitness and music analytics platform connecting Strava workouts with Spotify listening data.

  ### Web
  - Activity Dashboard with detailed workout metrics (pace, heart rate, distance, calories) and visual charts
  - AI Performance Insights powered by multiple LLM providers (OpenAI, Groq, OpenRouter, SambaNova, Cerebras)
  - Track Leaderboard ranking music by workout efficiency correlation
  - Session Recommendations with personalized track suggestions based on historical data
  - Global Map with interactive route polylines and heatmap mode for training intensity
  - Hex Exploration Grid using H3 hexagons to track area discovery percentage
  - Dark mode with View Transitions API animation, OS preference detection, and localStorage persistence
  - Mobile responsive design with gesture-based sidebar and safe area inset support

  ### API
  - Hono REST API on Cloudflare Workers with rate limiting and CORS middleware
  - Activity, athlete, sync, Spotify, and Strava route handlers
  - Drizzle ORM integration with Neon serverless PostgreSQL

  ### Integrations
  - Strava OAuth with real-time webhook updates for automatic activity ingestion
  - Spotify OAuth for pulling listening history and audio features
  - Webhook event processing for live activity sync

  ### Packages
  - `@tempo-sync/db` — Drizzle ORM schema, migrations, and pooled client for Neon PostgreSQL
  - `@tempo-sync/shared` — CORS, rate limiting, error handling middleware, Hono app/router factories, and utilities
  - `@tempo-sync/llm` — Multi-provider LLM integration with prompt management
  - `@tempo-sync/types` — Shared API and LLM type definitions
  - `@tempo-sync/config` — Shared TypeScript base and worker configurations

### Patch Changes

- Updated dependencies [[`bb52147`](https://github.com/swiftmg0d/tempo-sync/commit/bb52147ee7a8851b94ec427c994a18722d09611c)]:
  - @tempo-sync/shared@0.1.0
