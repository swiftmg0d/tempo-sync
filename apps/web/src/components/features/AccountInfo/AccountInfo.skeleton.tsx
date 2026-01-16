import { Box, Skeleton } from '@chakra-ui/react';

import { theme } from '@/styles';

export const AccountInfoSkeleton = () => {
	return (
		<Box width='220px' height='30px' gap={theme.spacing.s} display='flex' flexDirection='column'>
			<Skeleton width='95px' height='15px' borderRadius={theme.radii.xs} />
			<Skeleton width='65px' height='10px' borderRadius={theme.radii.xs} />
		</Box>
	);
};
