import { Skeleton } from '@chakra-ui/react';

import { MetricCardSkeleton } from '../Card/MetricCard.skeleton';

import * as M from './MetricList.styled';

import { theme } from '@/styles';

export const MetricsListSkeleton = () => {
	return (
		<M.MetricList.Section>
			<Skeleton
				borderRadius={theme.radii.xs}
				backgroundColor={theme.colors.skeleton.base}
				width='clamp(200px, 50vw, 256px)'
				height='30px'
			/>
			<M.MetricList.CardsContainer>
				{Array.from({ length: 4 }).map((_, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<MetricCardSkeleton key={index} />
				))}
			</M.MetricList.CardsContainer>
		</M.MetricList.Section>
	);
};
