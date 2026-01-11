import { Padded } from '@/styles/patterns';
import { theme } from '@/styles';
import { Box, Skeleton } from '@chakra-ui/react';
import { PulsingContainer } from './ActivityCard.styled';

export const ActivityCardSkeleton = () => {
	return (
		<Padded $p='md' $side='x' as={'li'}>
			<PulsingContainer>
				<Padded $p='md' $side='all'>
					<Box display={'flex'} flexDirection={'column'} gap={theme.spacing.xs}>
						<Box display={'flex'} flexDirection={'row'} gap={theme.spacing.lg}>
							{/*  Left Side Container*/}
							<Skeleton
								width={'80px'}
								height={'80px'}
								backgroundColor={theme.colors.skeleton.base}
								borderRadius={theme.radii.sm}
							/>
							{/*  Right Side Container */}
							<Box display={'flex'} gap={theme.spacing.xs} flexDirection={'column'}>
								{/* Top Section */}
								<Box
									width={'205px'}
									display={'flex'}
									gap={theme.spacing.sm}
									flexDirection={'column'}
								>
									{/*  Upper Section */}
									<Box display={'flex'} flexDirection={'row'}>
										<Skeleton
											display='inline-block'
											width='96px'
											height='14px'
											backgroundColor={theme.colors.skeleton.base}
											borderRadius={theme.radii.xs}
										/>
										<Skeleton
											width='32px'
											height='10px'
											backgroundColor={theme.colors.skeleton.base}
											borderRadius={theme.radii.xs}
											marginLeft={'auto'}
										/>
									</Box>
									{/*  Middle Section */}
									<Box display={'flex'} flexDirection={'row'} gap={theme.spacing.s}>
										<Skeleton
											width='10px'
											height='10px'
											backgroundColor={theme.colors.skeleton.base}
											borderRadius={'100%'}
										/>
										<Skeleton
											width='64px'
											height='10px'
											backgroundColor={theme.colors.skeleton.base}
											borderRadius={theme.radii.xs}
										/>
									</Box>
								</Box>
								{/* Bottom Section */}
								<Padded $p='sm' $side='top'>
									<Skeleton
										height={'32px'}
										borderRadius={theme.radii.sm}
										backgroundColor={'rgba(229, 231, 235, 0.5)'}
									/>
								</Padded>
							</Box>
						</Box>
					</Box>
				</Padded>
			</PulsingContainer>
		</Padded>
	);
};
