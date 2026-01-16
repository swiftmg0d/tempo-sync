import { MetricCard } from '../Card';

import * as M from './MetricList.styled';
import { MetricsListSkeleton } from './MetricsList.skeleton';
import type { MetricsListType } from './types';

import { withSkeleton } from '@/utils';

const MetricListComponent = ({ list, title }: MetricsListType) => {
	if (!list) return null;

	return (
		<M.MetricList.Section
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.1 }}
		>
			<M.MetricList.Header>{title}</M.MetricList.Header>
			<M.MetricList.CardsContainer>
				{list.map((metric) => (
					<MetricCard key={metric.id} {...metric} />
				))}
			</M.MetricList.CardsContainer>
		</M.MetricList.Section>
	);
};

export const MetricList = withSkeleton(MetricListComponent, MetricsListSkeleton);
