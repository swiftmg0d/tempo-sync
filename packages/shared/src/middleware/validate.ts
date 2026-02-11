import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono/types';
import type z from 'zod';

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
