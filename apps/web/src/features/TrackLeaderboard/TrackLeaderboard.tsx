import { BarChart3, TrendingDown } from 'lucide-react';

import { TrackItem } from './TrackItem';
import { TrackLeaderboardSkeleton } from './TrackLeaderboard.skeleton';
import { TrackLeaderboardStyled as S } from './TrackLeaderboard.styled';
import type { TrackLeaderboardProps } from './types';

import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';
import { theme } from '@/styles';

export const TrackLeaderboard = ({ flex }: TrackLeaderboardProps) => {
	const activityId = useActivityCardsStore((state) => state.activityId);
	const { data, isLoading } = Queries.useTrackLeaderboard(activityId ?? '')({
		enabled: !!activityId
	});

	return (
		<S.Container $flex={flex}>
			<S.HeaderSection>
				<BarChart3 color={theme.colors.bg.teal} size={20} />
				<S.HeaderTitle>Track Efficiency Leaderboard</S.HeaderTitle>
			</S.HeaderSection>
			{isLoading ? (
				<TrackLeaderboardSkeleton />
			) : data && data.length > 0 ? (
				<S.TrackList>
					{data.map((entry, index) => (
						<TrackItem
							key={`${entry.trackId}-${crypto.randomUUID()}`}
							rank={index + 1}
							{...entry}
						/>
					))}
				</S.TrackList>
			) : (
				<S.EmptyState>
					<div>
						<TrendingDown size={40} color={theme.colors.text.secondary} />
					</div>
					<S.EmptyStateTitle>No Track Data</S.EmptyStateTitle>
					<S.EmptyStateText>
						Track data will appear once you listen to music during activities
					</S.EmptyStateText>
				</S.EmptyState>
			)}
		</S.Container>
	);
};
