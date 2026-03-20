---
'@tempo-sync/db': patch
---

Fix Neon Pool WebSocket configuration for Cloudflare Workers. Set `neonConfig.webSocketConstructor = WebSocket` in `createPoolDb` so transactions work correctly in production (without it, `db.transaction()` fails silently while simple queries appear to work).
