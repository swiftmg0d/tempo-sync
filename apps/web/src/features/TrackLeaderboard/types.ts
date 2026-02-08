import type { TrackLeaderboardEntry } from '@tempo-sync/shared/types';

export interface TrackLeaderboardProps {
	flex?: number;
}

export interface TrackItemProps extends TrackLeaderboardEntry {
	rank: number;
}
