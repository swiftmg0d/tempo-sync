import { Box, Skeleton } from '@chakra-ui/react';

import { theme } from '@/styles';

export const InsightSummaryHeroSkeleton = () => {
	return (
		<Box
			display='flex'
			flexDirection='column-reverse'
			justifyContent='space-between'
			width='100%'
			paddingBottom={theme.spacing.lg}
			md={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			<Box
				flex={1}
				padding={theme.spacing.lg}
				md={{ padding: theme.spacing['3xl'] }}
				display='flex'
				flexDirection='column'
				alignItems='flex-start'
				gap={theme.spacing.xxl}
			>
				<Box display='flex' flexDirection='column' gap={theme.spacing.s} width='100%'>
					<Skeleton
						borderRadius={theme.radii.md}
						height='clamp(30px, 10vw, 45px)'
						width='100%'
						md={{
							width: 'clamp(150px, 50vw, 350px)'
						}}
						backgroundColor={theme.colors.skeleton.base}
					/>
				</Box>

				<Box display='flex' flexDirection='column' gap={theme.spacing.s} width='100%'>
					<Skeleton
						borderRadius={theme.radii.md}
						height='clamp(10px, 10vw, 15px)'
						width='100%'
						md={{
							width: 'clamp(150px, 50vw, 350px)'
						}}
						backgroundColor={theme.colors.skeleton.base}
					/>
					<Skeleton
						borderRadius={theme.radii.md}
						height='clamp(10px, 10vw, 15px)'
						width='clamp(100px, 30vw, 250px)'
						backgroundColor={theme.colors.skeleton.base}
					/>
					<Skeleton
						borderRadius={theme.radii.md}
						height='clamp(10px, 10vw, 15px)'
						width='100%'
						md={{
							width: 'clamp(150px, 50vw, 350px)'
						}}
						backgroundColor={theme.colors.skeleton.base}
					/>
				</Box>
				<Skeleton
					borderRadius={theme.radii.md}
					height='clamp(24px, 10vw, 48px)'
					width='clamp(70px, 50vw, 170px)'
					backgroundColor={theme.colors.skeleton.base}
				/>
			</Box>
			<Box flex={1} width='100%'>
				<Box
					padding={theme.spacing.lg}
					md={{ padding: theme.spacing['3xl'] }}
					width='100%'
					height='100%'
				>
					<Skeleton
						borderRadius={theme.radii.md}
						backgroundColor={theme.colors.skeleton.base}
						height='clamp(100px, 50vw, 400px)'
						width='100%'
						md={{
							height: '100%',
							width: '100%'
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};
