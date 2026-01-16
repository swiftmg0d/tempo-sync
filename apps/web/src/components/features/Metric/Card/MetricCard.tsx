import * as M from './MetricCard.styled';
import type { MetricCardProps } from './types';

import { Icons } from '@/components/icons';

export const MetricCard = ({ icon, description, metric }: MetricCardProps) => {
	const MetricIcon = Icons[icon];

	return (
		<M.MetricCard.Card>
			<M.MetricCard.Header>
				<MetricIcon active />
				<M.MetricCard.Description>{description}</M.MetricCard.Description>
			</M.MetricCard.Header>
			<M.MetricCard.MetricInfoContainer>
				<M.MetricCard.MetricInfo $primary>{metric.value}</M.MetricCard.MetricInfo>
				<M.MetricCard.MetricInfo>{metric.unit}</M.MetricCard.MetricInfo>
			</M.MetricCard.MetricInfoContainer>
		</M.MetricCard.Card>
	);
};
