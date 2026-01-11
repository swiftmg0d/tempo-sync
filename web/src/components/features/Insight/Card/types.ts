import type { IconName } from '@/components/icons';

export type InsightCardProps = {
	icon: IconName;
	title: string;
	isLoading?: boolean;
	value: string;
	label?: string;
	info: string;
	variant?: 'default' | 'highlight';
};
