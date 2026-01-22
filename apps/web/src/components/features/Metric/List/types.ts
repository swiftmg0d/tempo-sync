import type { MetricCard } from '../Card/types';

export interface MetricsListType {
	title: string;
	list: MetricCard[] | null;
	date?: Date;
	deviceName?: string | null;
	gear?: string | null;
}
