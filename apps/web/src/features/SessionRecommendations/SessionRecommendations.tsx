import { CheckCircle2, ChevronsDown, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { RecommendationCard } from './RecommendationCard';
import { SessionRecommendationsSkeleton } from './SessionRecommendations.skeleton';
import { SessionRecommendationsStyled as S } from './SessionRecommendations.styled';
import type { SessionRecommendationsProps } from './types';

import { Icons } from '@/components/icons';
import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';
import { theme } from '@/styles';

export const SessionRecommendations = ({ flex }: SessionRecommendationsProps) => {
	const activityId = useActivityCardsStore((state) => state.activityId);
	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		Queries.useTrackRecommendations(activityId ?? '');

	const recommendations = data?.pages.flatMap((page) => page.data.recommendations) ?? [];

	const listRef = useRef<HTMLDivElement | null>(null);
	const { ref, inView } = useInView({
		root: listRef.current,
		rootMargin: '0px 0px 80px 0px',
		threshold: 0
	});

	useEffect(() => {
		if (!inView || !hasNextPage || isFetchingNextPage) {
			return;
		}

		const list = listRef.current;
		if (list && list.scrollHeight <= list.clientHeight) {
			return;
		}

		void fetchNextPage();
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<S.Container $flex={flex}>
			<S.HeaderSection>
				<Sparkles color={theme.colors.bg.teal} size={20} />
				<S.HeaderTitle>Recommended for Next Session</S.HeaderTitle>
			</S.HeaderSection>
			{isLoading ? (
				<SessionRecommendationsSkeleton />
			) : recommendations.length > 0 ? (
				<S.TrackList ref={listRef}>
					{recommendations.map((track) => (
						<RecommendationCard key={track.id} {...track} />
					))}
					{hasNextPage ? (
						<S.LoadMoreTrigger ref={ref}>
							{isFetchingNextPage ? (
								<>
									<Loader2 className='spinner' size={14} color={theme.colors.icon.secondary} />
									<S.StatusText>Loading more...</S.StatusText>
								</>
							) : (
								<>
									<ChevronsDown size={14} color={theme.colors.icon.secondary} />
									<S.StatusText>Scroll for more</S.StatusText>
								</>
							)}
						</S.LoadMoreTrigger>
					) : (
						<S.EndOfList>
							<S.EndOfListIconRow>
								<S.EndOfListDivider />
								<CheckCircle2 size={16} color={theme.colors.bg.teal} />
								<S.EndOfListDivider />
							</S.EndOfListIconRow>
							<S.StatusText>All recommendations loaded</S.StatusText>
						</S.EndOfList>
					)}
				</S.TrackList>
			) : (
				<S.EmptyState>
					<div>{Icons.headphoneSync()}</div>
					<S.EmptyStateTitle>No Recommendations Yet</S.EmptyStateTitle>
					<S.EmptyStateText>
						Play more tracks during your runs to get personalized recommendations
					</S.EmptyStateText>
				</S.EmptyState>
			)}
		</S.Container>
	);
};
