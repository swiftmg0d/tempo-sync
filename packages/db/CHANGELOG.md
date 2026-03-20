# @tempo-sync/db

## 0.1.1

### Patch Changes

- [#37](https://github.com/swiftmg0d/tempo-sync/pull/37) [`24fa845`](https://github.com/swiftmg0d/tempo-sync/commit/24fa8451a6c043748c9a390bbc9c1db9690b16ff) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - Fix Neon Pool WebSocket configuration for Cloudflare Workers. Set `neonConfig.webSocketConstructor = WebSocket` in `createPoolDb` so transactions work correctly in production (without it, `db.transaction()` fails silently while simple queries appear to work).

## 0.1.0

### Minor Changes

- [#19](https://github.com/swiftmg0d/tempo-sync/pull/19) [`f5d9052`](https://github.com/swiftmg0d/tempo-sync/commit/f5d9052b6cf70da7e1410649e7e575f7a97ca64e) Thanks [@swiftmg0d](https://github.com/swiftmg0d)! - Initial release of the database package.
  - Drizzle ORM schema, migrations, and pooled client for Neon serverless PostgreSQL

### Patch Changes

- Updated dependencies [[`f5d9052`](https://github.com/swiftmg0d/tempo-sync/commit/f5d9052b6cf70da7e1410649e7e575f7a97ca64e)]:
  - @tempo-sync/types@0.1.0
