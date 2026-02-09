import type { Context, Env, ValidationTargets } from 'hono';
import type z from 'zod';

export type ValidatedContext<
  T extends z.ZodType,
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
  TParam extends z.ZodType,
  TBody extends z.ZodType,
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

export type ParamQueryValidatedContext<
  TParam extends z.ZodType,
  TQuery extends z.ZodType,
  A extends Env = Env,
  Path extends string = '/',
> = Context<
  A,
  Path,
  {
    in: { param: z.infer<TParam>; query: z.infer<TQuery> };
    out: { param: z.infer<TParam>; query: z.infer<TQuery> };
  }
>;
