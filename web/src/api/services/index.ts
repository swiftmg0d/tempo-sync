import type {
	Activity,
	ActivitySummary,
	Athlete,
	ActivitySummaryStats,
	Pagination
} from '@/types/models';
import api from '../client';
import type { ApiResponse } from '../types';

export const apiService = {
	activity: {
		getActivities: (page?: number, limit?: number) =>
			api.get<ApiResponse<{ activities: Activity[]; pagination: Pagination }>>(`/activity`, {
				params: { page: page, limit: limit }
			}),
		getSummaryById: (id: number) =>
			api.get<ApiResponse<ActivitySummary>>(`/activity/${id}/summary`),
		getAllActivitySummaries: () =>
			api.get<ApiResponse<ActivitySummaryStats[]>>('/activity/summaries')
	},
	athlete: {
		getMe: () => api.get<ApiResponse<{ athlete: Athlete }>>('/athlete')
	},
	sync: {
		getState: () => api.get<ApiResponse<{ state: string }>>('/sync/state')
	}
};
