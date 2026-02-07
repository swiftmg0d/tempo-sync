import { zValidator } from '@hono/zod-validator';
import type { Context, ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type z from 'zod';

import { GenericError } from '../errors';

export const validate = <Target extends keyof ValidationTargets, Schema extends z.ZodType>(
  target: Target,
  schema: Schema
) => {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          error: 'Validation failed',
          details: result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        400
      );
    }
  });
};

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
