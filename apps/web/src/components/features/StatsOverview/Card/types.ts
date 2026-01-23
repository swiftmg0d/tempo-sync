import type { ActivitySummaryStats } from '@tempo-sync/shared';

export interface StatsOverviewCardProps extends Omit<ActivitySummaryStats, 'id'> {
	isLoading?: boolean;
	variant?: 'default' | 'highlight';
}
