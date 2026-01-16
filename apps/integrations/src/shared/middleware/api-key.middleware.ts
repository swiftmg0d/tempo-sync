import type { Next } from 'hono';

import type { AppContext } from '../types';

export const apiKeyMiddleware = (c: AppContext, next: Next) => {
  const apiKey = c.req.header('x-api-key');
  if (!apiKey || apiKey !== c.env.X_API_KEY) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  return next();
};
