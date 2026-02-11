import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { GenericError } from '../errors';

export const errorHandler = (err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message, status: err.status }, err.status);
  }

  if (err instanceof GenericError) {
    return c.json({ message: err.message, status: err.status }, err.status);
  }

  console.error('Unhandled error:', err);

  return c.json({ message: 'Internal Server Error', status: 500 }, 500);
};
