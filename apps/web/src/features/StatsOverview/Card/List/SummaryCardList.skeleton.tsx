import { Box } from '@chakra-ui/react/box';

import { StatsOverviewCard } from '../SummaryCard';

export default function SummaryCardListSkeleton() {
	return (
		<Box display='flex' flexDirection='row' flexWrap='wrap' gap='16px'>
			{Array.from({ length: 5 }).map((_, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<StatsOverviewCard key={index} isLoading icon='map' title='' value={0} info='' />
			))}
		</Box>
	);
}
