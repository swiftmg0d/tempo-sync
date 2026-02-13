import { useInfiniteQuery } from '@tanstack/react-query';

import { createQuery } from '../createQuery';

import { apiService } from '@/api/services';
import { fromPolygonToCells } from '@/lib/map';
import { queryKeys } from '@/lib/queryKeys';

export const useActivities = () =>
	useInfiniteQuery({
		queryKey: queryKeys.activity.list,
		queryFn: ({ pageParam }) => apiService.activity.getActivities(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.data.pagination.nextPage
	});

const useActivitySummary = (id: string) =>
	createQuery({
		queryFn: () => apiService.activity.getSummaryById(id),
		queryKey: queryKeys.activity.summary(id),
		options: {
			enabled: !!id,
			select: (res) => res.data
		}
	});

const useActivitiesSummaries = createQuery({
	queryFn: apiService.activity.getAllActivitySummaries,
	queryKey: queryKeys.activity.summaries(),
	options: {
		select: (res) => res.data
	}
});

const useSyncStatus = createQuery({
	queryKey: queryKeys.sync.status,
	queryFn: apiService.sync.getStatus,

	options: {
		staleTime: 1 * 60 * 1000,
		gcTime: 2 * 60 * 1000,
		select: (res) => res.data.status
	}
});

const useActivitiesPolylines = createQuery({
	queryKey: queryKeys.activity.polylines(),
	queryFn: apiService.activity.getActivitiesPolylines,
	options: {
		select: (res) => res.data
	}
});

const useCurrentAthlete = createQuery({
	queryKey: queryKeys.athlete.me,
	queryFn: apiService.athlete.getMe,
	options: {
		select: (res) => res.data.athlete,
		staleTime: 5 * 60 * 1000
	}
});

const useLLMActivityInsights = (id: string) =>
	createQuery({
		queryFn: () => apiService.activity.getActivityLLMInsights(id),
		queryKey: queryKeys.activity.LLMInsights(id),
		options: {
			enabled: !!id,
			select: (res) => res.data
		}
	});

const useProfiles = createQuery({
	queryKey: queryKeys.profile.list,
	queryFn: apiService.profile.getProfiles,
	options: {
		select: (res) => res.data
	}
});

const useAthleteTopArtist = createQuery({
	queryKey: queryKeys.athlete.topArtist,
	queryFn: () => apiService.spotify.getTopArtists(),
	options: {
		select: (res) => res.data
	}
});

const useAthleteTotalActivities = createQuery({
	queryKey: queryKeys.athlete.totalActivities,
	queryFn: () => apiService.strava.getAllActivitiesCount(),
	options: {
		select: (res) => res.data
	}
});

const useActivityStreams = (id: string, streamTypes: string[]) =>
	createQuery({
		queryFn: () => apiService.activity.getActivityStreams(id, streamTypes),
		queryKey: queryKeys.activity.streams(id, streamTypes),
		options: {
			select: (res) => res.data
		}
	});

const useTrackLeaderboard = (id: string) =>
	createQuery({
		queryFn: () => apiService.activity.getTrackLeaderboard(id),
		queryKey: queryKeys.activity.trackLeaderboard(id),
		options: {
			enabled: !!id,
			select: (res) => res.data
		}
	});

const useTrackRecommendations = (id: string) =>
	useInfiniteQuery({
		queryKey: queryKeys.activity.trackRecommendations(id),
		queryFn: ({ pageParam }) => apiService.activity.getTrackRecommendations(id, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.data.pagination.nextPage,
		enabled: !!id
	});

const useActivityHighlights = (id: string) =>
	createQuery({
		queryFn: () => apiService.activity.getActivityHighlights(id),
		queryKey: queryKeys.activity.highlights(id),
		options: {
			enabled: !!id,
			select: (res) => res.data
		}
	});

const useMapHexagons = () =>
	createQuery({
		queryFn: () => apiService.map.getHexPolygons(),
		queryKey: queryKeys.map.hexagons(),
		options: {
			select: (res) => new Set(fromPolygonToCells(res.features[0].geometry))
		}
	});

export const Queries = {
	useActivities,
	useActivitySummary,
	useActivitiesSummaries,
	useSyncStatus,
	useActivitiesPolylines,
	useCurrentAthlete,
	useLLMActivityInsights,
	useProfiles,
	useAthleteTopArtist,
	useAthleteTotalActivities,
	useActivityStreams,
	useTrackLeaderboard,
	useTrackRecommendations,
	useActivityHighlights,
	useMapHexagons
};
