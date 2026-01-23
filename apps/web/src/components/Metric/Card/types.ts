import type { IconName } from '@/components/icons';

export interface MetricCardProps {
	id?: `${string}-${string}-${string}-${string}-${string}`;
	icon: IconName;
	description: string;
	metric: {
		value: string;
		unit: string;
	};
}

export type MetricCard = MetricCardProps;
