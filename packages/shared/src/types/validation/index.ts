import type { Context, Env, ValidationTargets } from 'hono';
import type z from 'zod';

export type ValidatedContext<
  T extends z.ZodSchema,
  Target extends keyof ValidationTargets,
  A extends Env = Env,
  Path extends string = '/',
> = Context<
  A,
  Path,
  {
    in: { [K in Target]: z.infer<T> };
    out: { [K in Target]: z.infer<T> };
  }
>;
