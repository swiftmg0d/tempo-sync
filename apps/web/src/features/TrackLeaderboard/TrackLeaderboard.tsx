import { BarChart3 } from 'lucide-react';

import { TrackItem } from './TrackItem';
import { TrackLeaderboardSkeleton } from './TrackLeaderboard.skeleton';
import { TrackLeaderboardStyled as S } from './TrackLeaderboard.styled';
import type { TrackLeaderboardProps } from './types';

import { Icons } from '@/components/icons';
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
						<TrackItem key={`${entry.trackId}-${entry.artist}`} rank={index + 1} {...entry} />
					))}
				</S.TrackList>
			) : (
				<S.EmptyState>{Icons.headphoneSync()}</S.EmptyState>
			)}
		</S.Container>
	);
};
