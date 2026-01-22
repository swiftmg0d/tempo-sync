import { Box } from '@chakra-ui/react/box';
import type { ActivitySummaryStats } from '@tempo-sync/shared/types';

import { InsightCard } from '../InsightCard';

import { InsightCardListSkeleton } from './InsightCardList.skeleton';

import { withSkeleton } from '@/utils';

const InsightCardListComponent = ({ data }: { data: ActivitySummaryStats[] }) => {
	if (data.length === 0) return null;

	return (
		<Box display='flex' flexDirection='row' flexWrap='wrap' gap='16px'>
			{data.map((props) => (
				<InsightCard key={props.id} {...props} />
			))}
		</Box>
	);
};

export const InsightCardList = withSkeleton(InsightCardListComponent, InsightCardListSkeleton);
