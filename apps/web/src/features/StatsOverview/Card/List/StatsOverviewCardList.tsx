import { Box } from '@chakra-ui/react/box';
import type { ActivitySummaryStats } from '@tempo-sync/shared/types';

import { StatsOverviewCard } from '../SummaryCard';

import SummaryCardListSkeleton from './SummaryCardList.skeleton';

import { withSkeleton } from '@/utils';

const StatsOverviewCardListComponent = ({ data }: { data: ActivitySummaryStats[] }) => {
	if (data.length === 0) return null;

	return (
		<Box display='flex' flexDirection='row' flexWrap='wrap' gap='16px'>
			{data.map((props) => (
				<StatsOverviewCard key={props.id} {...props} />
			))}

			<StatsOverviewCard
				title='Music'
				icon='headphone'
				value={642}
				info='Time streamed'
				label='hrs'
			/>
		</Box>
	);
};

export const StatsOverviewCardList = withSkeleton(
	StatsOverviewCardListComponent,
	SummaryCardListSkeleton
);
