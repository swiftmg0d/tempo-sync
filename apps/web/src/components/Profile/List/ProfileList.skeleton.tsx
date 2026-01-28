import { Box, Skeleton } from '@chakra-ui/react';

import { ProfileCard } from '../Card';

import { theme } from '@/styles';

export const ProfileListSkeleton = () => {
	return (
		<Box display='flex' flexDirection='row' gap='16px' flexWrap='wrap' marginTop='48px'>
			{[1, 2].map((item) => (
				<Skeleton
					key={Math.random() * 1000 + item}
					backgroundColor={theme.colors.skeleton.base}
					flex={1}
					borderRadius={theme.radii.md}
				>
					<ProfileCard icon='map' header='Loading Profile' infoTitle='' infoValue='' href='' />
				</Skeleton>
			))}
		</Box>
	);
};
