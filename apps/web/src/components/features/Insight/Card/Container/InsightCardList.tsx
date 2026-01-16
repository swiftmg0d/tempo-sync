import { withSkeleton } from '@/utils';
import { InsightCardListSkeleton } from './InsightCardList.skeleton';
import { Box } from '@chakra-ui/react';
import { InsightCard } from '../InsightCard';
import type { ActivitySummaryStats } from '@tempo-sync/shared/types';

const InsightCardListComponent = ({ data }: { data: ActivitySummaryStats[] }) => {
	if (!data) return null;

	return (
		<Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={'16px'}>
			{data.map((props) => (
				<InsightCard key={props.id} {...props} />
			))}
		</Box>
	);
};

export const InsightCardList = withSkeleton(InsightCardListComponent, InsightCardListSkeleton);
