import z from 'zod';

export const activitySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(6),
});

export const getActivitySummaryShema = z.object({
  id: z.string().min(1),
});

export type ActivityValidation = typeof activitySchema;
export type ActivitySummaryValidation = typeof getActivitySummaryShema;

export const getActivityLLMInsightsSchema = getActivitySummaryShema;
export type ActivityLLMInsightsValidation = typeof getActivityLLMInsightsSchema;
