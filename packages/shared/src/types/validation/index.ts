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
    in: Record<Target, z.infer<T>>;
    out: Record<Target, z.infer<T>>;
  }
>;

export type MultiValidatedContext<
  TParam extends z.ZodSchema,
  TBody extends z.ZodSchema,
  A extends Env = Env,
  Path extends string = '/',
> = Context<
  A,
  Path,
  {
    in: { param: z.infer<TParam>; json: z.infer<TBody> };
    out: { param: z.infer<TParam>; json: z.infer<TBody> };
  }
>;
