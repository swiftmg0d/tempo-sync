import { type ActivitySummaryStats } from '@tempo-sync/shared';

export interface InsightCardProps extends Omit<ActivitySummaryStats, 'id'> {
	isLoading?: boolean;
	variant?: 'default' | 'highlight';
}
