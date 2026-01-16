import type {
	Activities,
	ActivitySummary,
	ActivitySummaryStats,
	Athlete
} from '@tempo-sync/shared/types';

import api from '../client';
import type { ApiResponse } from '../types';

export const apiService = {
	activity: {
		getActivities: (page?: number, limit?: number) =>
			api.get<ApiResponse<Activities>>(`/activity`, {
				params: { page: page, limit: limit }
			}),
		getSummaryById: (id: string) =>
			api.get<ApiResponse<ActivitySummary>>(`/activity/${id}/summary`),
		getAllActivitySummaries: () =>
			api.get<ApiResponse<ActivitySummaryStats[]>>('/activity/summary/overall')
	},
	athlete: {
		getMe: () => api.get<ApiResponse<{ athlete: Athlete }>>('/athlete')
	},
	sync: {
		getStatus: () => api.get<ApiResponse<{ status: string }>>('/sync/status')
	}
};
