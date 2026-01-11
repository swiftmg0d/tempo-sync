import { apiService } from '@/api/services';
import { queryKeys } from '@/lib/queryKeys';
import { createQuery } from '../createQuery';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useActivities = () =>
	useInfiniteQuery({
		queryKey: queryKeys.activity.list,
		queryFn: ({ pageParam }) => apiService.activity.getActivities(pageParam, 6),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.data.pagination.nextPage
	});

const useActivitySummary = (id: number) =>
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

const useState = createQuery({
	queryKey: queryKeys.sync.state,
	queryFn: apiService.sync.getState,

	options: {
		staleTime: 1 * 60 * 1000,
		gcTime: 2 * 60 * 1000,
		select: (res) => res.data.state
	}
});

export const Queries = {
	useActivities,
	useActivitySummary,
	useActivitiesSummaries,
	useState
};
