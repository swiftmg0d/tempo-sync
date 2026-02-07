import type {
	Activities,
	ActivitySummary,
	ActivitySummaryStats,
	Athlete,
	LLMActivityInsightResponse,
	Profile
} from '@tempo-sync/shared/types';
import type { ChartData as StreamsResponse } from 'recharts/types/state/chartDataSlice';

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
			api.get<ApiResponse<ActivitySummaryStats[]>>('/activity/summary/overall'),
		getActivitiesPolylines: () =>
			api.get<ApiResponse<{ polyline: string; activityId: string }[]>>('/activity/polylines'),
		getActivityLLMInsights: (id: string) =>
			api.get<ApiResponse<LLMActivityInsightResponse>>(`/activity/${id}/llm-insights`),
		getActivityStreams: (id: string, streamTypes: string[]) =>
			api.post<ApiResponse<StreamsResponse>>(`/activity/${id}/streams`, {
				streamTypes
			})
	},
	athlete: {
		getMe: () => api.get<ApiResponse<{ athlete: Athlete }>>('/athlete')
	},
	sync: {
		getStatus: () => api.get<ApiResponse<{ status: string }>>('/sync/status')
	},
	profile: {
		getProfiles: () => api.get<ApiResponse<(Profile & { title: string })[]>>('/athlete/profiles')
	},
	spotify: {
		getTopArtists: () => api.get<ApiResponse<{ name: string; href: string }>>('/spotify/top-artist')
	},
	strava: {
		getAllActivitiesCount: () => api.get<ApiResponse<{ count: number }>>('/strava/activities/count')
	}
};
