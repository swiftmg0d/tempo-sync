import {
	useQuery,
	type QueryKey,
	type UseQueryOptions,
	type UseQueryResult
} from '@tanstack/react-query';

type QueryOptions<
	TData,
	TError = Error,
	TSelectData = TData,
	TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TData, TError, TSelectData, TQueryKey>, 'queryKey' | 'queryFn'>;

export function createQuery<TData, TSelectData = TData, TError = Error>(config: {
	queryKey: QueryKey;
	queryFn: () => Promise<TData>;
	options?: QueryOptions<TData, TError, TSelectData>;
}) {
	return function (
		options?: QueryOptions<TData, TError, TSelectData>
	): UseQueryResult<TSelectData, TError> {
		return useQuery({
			queryKey: config.queryKey,
			queryFn: config.queryFn,
			...config.options,
			...options
		} as UseQueryOptions<TData, TError, TSelectData>);
	};
}
