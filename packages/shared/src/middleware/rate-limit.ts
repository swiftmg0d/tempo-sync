import type { Context, Next } from 'hono';

interface RateLimit {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
}

export interface RateLimitConfig {
  keyGenerator?: (c: Context) => string;
  handler?: (c: Context) => Response;
}

export interface RateLimitEnv {
  Bindings: {
    RATE_LIMITER?: RateLimit;
  };
}

function defaultKeyGenerator(c: Context): string {
  const cfIp = c.req.header('CF-Connecting-IP');
  if (cfIp) return cfIp;

  const forwarded = c.req.header('X-Forwarded-For');
  if (forwarded) return forwarded.split(',')[0].trim();

  return 'unknown';
}

function defaultHandler(c: Context): Response {
  return c.json(
    {
      success: false,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
    },
    429
  );
}

export const rateLimit = <T extends RateLimitEnv>(config: RateLimitConfig = {}) => {
  const { keyGenerator = defaultKeyGenerator, handler = defaultHandler } = config;

  return async (c: Context<T>, next: Next) => {
    if (!c.env.RATE_LIMITER) {
      console.warn('RATE_LIMITER binding not found - skipping rate limiting (local dev)');
      return next();
    }

    const identifier = keyGenerator(c);
    const key = `${c.req.path}:${identifier}`;

    const { success } = await c.env.RATE_LIMITER.limit({ key });

    if (!success) {
      return handler(c);
    }

    return next();
  };
};

export const rateLimiters = {
  standard: <T extends RateLimitEnv>() => rateLimit<T>(),

  byPath: <T extends RateLimitEnv>() =>
    rateLimit<T>({
      keyGenerator: (c) => {
        const identifier = defaultKeyGenerator(c);
        return `${c.req.path}:${identifier}`;
      },
    }),

  authenticated: <T extends RateLimitEnv>() =>
    rateLimit<T>({
      keyGenerator: (c) => {
        const apiKey = c.req.header('X-API-Key');
        const authHeader = c.req.header('Authorization');
        return apiKey ?? authHeader ?? defaultKeyGenerator(c);
      },
    }),
};
