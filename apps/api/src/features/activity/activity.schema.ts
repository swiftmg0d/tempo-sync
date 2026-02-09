import z from 'zod';

export const activitySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(6),
});

export const getActivitySummarySchema = z.object({
  id: z.string().min(1),
});

export type ActivityValidation = typeof activitySchema;
export type ActivitySummaryValidation = typeof getActivitySummarySchema;

export const getActivityLLMInsightsSchema = getActivitySummarySchema;
export type ActivityLLMInsightsValidation = typeof getActivityLLMInsightsSchema;

export const getActivityStreamsParamsSchema = z.object({
  id: z.string().min(1),
});

export const getActivityStreamsBodySchema = z.object({
  streamTypes: z.array(z.enum(['heartrate', 'cadence', 'pace', 'tempo'])).min(1),
});

export type ActivityStreamsParamsValidation = typeof getActivityStreamsParamsSchema;
export type ActivityStreamsBodyValidation = typeof getActivityStreamsBodySchema;

export const getActivityTrackLeaderboardSchema = getActivitySummarySchema;
export type ActivityTrackLeaderboardValidation = typeof getActivityTrackLeaderboardSchema;

export const getActivityTrackRecommendationsParamSchema = getActivitySummarySchema;
export type ActivityTrackRecommendationsParamValidation =
  typeof getActivityTrackRecommendationsParamSchema;

export const getActivityTrackRecommendationsQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(3),
});
export type ActivityTrackRecommendationsQueryValidation =
  typeof getActivityTrackRecommendationsQuerySchema;
