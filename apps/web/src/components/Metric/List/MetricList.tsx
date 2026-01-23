import { Box } from '@chakra-ui/react';
import { formatDate } from 'date-fns';

import { MetricCard } from '../Card';

import * as M from './MetricList.styled';
import { MetricsListSkeleton } from './MetricsList.skeleton';
import type { MetricsListType } from './types';

import { withSkeleton } from '@/utils';

const MetricListComponent = ({ list, title, date, deviceName, gear }: MetricsListType) => {
	if (!list) return null;

	return (
		<M.MetricList.Section
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.1 }}
		>
			<Box>
				<M.MetricList.Header>{title}</M.MetricList.Header>
				<M.MetricList.SubInfo>
					{formatDate(date ?? new Date(), 'PP')} · Tracked with {deviceName} · Ran in {gear}
				</M.MetricList.SubInfo>
			</Box>
			<M.MetricList.CardsContainer>
				{list.map((metric) => (
					<MetricCard key={metric.id} {...metric} />
				))}
			</M.MetricList.CardsContainer>
		</M.MetricList.Section>
	);
};

export const MetricList = withSkeleton(MetricListComponent, MetricsListSkeleton);
