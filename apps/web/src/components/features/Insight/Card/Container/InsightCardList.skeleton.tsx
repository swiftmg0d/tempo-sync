import { InsightCard } from '../InsightCard';

import { Box } from '@/styles';

export const InsightCardListSkeleton = () => {
	return (
		<Box display='flex' flexDirection='row' flexWrap='wrap' gap='16px'>
			{Array.from({ length: 4 }).map((_, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<InsightCard key={index} isLoading icon='map' title='' value={0} info='' />
			))}
		</Box>
	);
};
