# @tempo-sync/web

React 19 + Vite frontend for Tempo-Sync.

## Tech

- **UI**: Emotion, Chakra UI v3, Motion
- **State**: Zustand
- **Data**: TanStack React Query, Axios
- **Maps**: MapLibre GL + MapTiler
- **Charts**: Recharts

## Scripts

```bash
pnpm dev            # Start dev server (localhost:5173)
pnpm build          # Production build
pnpm check-types    # TypeScript type checking
pnpm lint           # Run ESLint
pnpm deploy         # Deploy to Cloudflare Pages
```

## Environment Variables

| Variable       | Description      |
| -------------- | ---------------- |
| `VITE_APP_URL` | API base URL     |
| `VITE_MAP_KEY` | MapTiler API key |
