import { theme } from '@/styles';
import { Box, Skeleton } from '@chakra-ui/react';

export const MetricCardSkeleton = () => {
	return (
		<Box
			as={'article'}
			borderRadius={theme.radii.lg}
			borderWidth={'1px'}
			borderColor={theme.colors.border.primaryRgb(0.08)}
			padding={theme.spacing.lg}
			flex={1}
			display={'flex'}
			flexDirection={'column'}
			gap={'18px'}
		>
			<Box as={'h3'} display={'flex'} justifyContent={'space-between'}>
				<Skeleton
					width={'24px'}
					height={'24px'}
					borderRadius={'9999px'}
					backgroundColor={theme.colors.skeleton.base}
				/>
				<Skeleton width={'64px'} height={'12px'} backgroundColor={theme.colors.skeleton.base} />
			</Box>
			<Box display={'flex'} flexDirection={'row'} gap={'1px'}>
				<Skeleton
					as={'p'}
					width={'56px'}
					height={'45px'}
					backgroundColor={theme.colors.skeleton.base}
				/>
				<Skeleton
					as={'p'}
					width={'24px'}
					height={'20px'}
					backgroundColor={theme.colors.skeleton.base}
					alignSelf={'flex-end'}
				/>
			</Box>
		</Box>
	);
};
