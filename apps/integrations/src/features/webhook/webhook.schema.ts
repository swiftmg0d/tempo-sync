import { z } from 'zod';

export const stravaWebhookSchema = z.object({
  owner_id: z.number(),
  object_type: z.enum(['activity', 'athlete']),
  object_id: z.number(),
  aspect_type: z.enum(['create', 'update', 'delete']),
  event_time: z.number(),
  subscription_id: z.number(),
  updates: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export const stravaCallbackSchema = z.object({
  code: z.string(),
  scope: z.string().optional(),
});

export const stravaVerifySchema = z.object({
  'hub.mode': z.string(),
  'hub.verify_token': z.string(),
  'hub.challenge': z.string(),
});

export type StravaVerifyValidation = typeof stravaVerifySchema;
export type StravaCallbackValidation = typeof stravaCallbackSchema;
export type StravaWebhookValidation = typeof stravaWebhookSchema;

export type StravaWebhookEvent = z.infer<StravaWebhookValidation>;
export type StravaCallbackEvent = z.infer<StravaCallbackValidation>;
export type StravaVerify = z.infer<StravaVerifyValidation>;
