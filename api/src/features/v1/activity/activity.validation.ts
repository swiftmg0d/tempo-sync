import { z } from 'zod';

export const getActivitySummaryShema = z.object({
	params: z.object({
		id: z.coerce.number().int().positive(),
	}),
});

export const getActivitiesSchema = z.object({
	params: z.object({
		limit: z.coerce.number().int().positive(),
		page: z.coerce.number().int().positive(),
	}),
});
