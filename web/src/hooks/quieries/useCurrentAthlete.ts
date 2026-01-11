import { apiService } from '@/api/services';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCurrentAthlete() {
	return useQuery({
		queryKey: queryKeys.athlete.me,
		queryFn: apiService.athlete.getMe,
		select: (res) => res.data.athlete,
		staleTime: 5 * 60 * 1000
	});
}
