import type { Context, Next } from 'hono';
import { cors as honoCors } from 'hono/cors';

export interface CorsEnv {
  Bindings: {
    ALLOWED_ORIGINS?: string;
  };
}

export const corsMiddleware = <T extends CorsEnv>() => {
  return async (c: Context<T>, next: Next) => {
    const allowedOriginsStr = c.env.ALLOWED_ORIGINS;

    if (!allowedOriginsStr) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return honoCors()(c, next);
    }

    const allowedOrigins = allowedOriginsStr.split(',').map((o) => o.trim());
    const origin = c.req.header('Origin');

    if (c.req.method === 'OPTIONS') {
      if (origin && allowedOrigins.includes(origin)) {
        c.header('Access-Control-Allow-Origin', origin);
        c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
        c.header('Access-Control-Allow-Credentials', 'true');
        c.header('Access-Control-Max-Age', '3600');
        return c.body(null, 204);
      }
      return c.body(null, 403);
    }

    if (origin && allowedOrigins.includes(origin)) {
      c.header('Access-Control-Allow-Origin', origin);
      c.header('Access-Control-Allow-Credentials', 'true');
    }

    await next();
  };
};
