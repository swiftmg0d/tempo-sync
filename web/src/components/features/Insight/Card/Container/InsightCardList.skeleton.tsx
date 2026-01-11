import { Box } from '@chakra-ui/react';
import { InsightCard } from '../InsightCard';

export const InsightCardListSkeleton = () => {
	return (
		<Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={'16px'}>
			{Array.from({ length: 4 }).map((_, index) => (
				<InsightCard key={index} isLoading={true} icon={'map'} title={''} value={''} info={''} />
			))}
		</Box>
	);
};
