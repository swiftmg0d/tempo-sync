import { Box as BaseBox, Box, Image } from '@chakra-ui/react';
import prettyMilliseconds from 'pretty-ms';

import * as A from './ActivityCard.styled';
import type { ActivityCardProps } from './types';

import { PolylinePreview } from '@/components/PolylinePreview/PolylinePreview';
import { Icons } from '@/components/icons';
import { theme } from '@/styles';
import { Padded } from '@/styles/patterns';
import { formatDateDistance } from '@/utils';

export const ActivityCard = ({
	active,
	onClick,
	date,
	title,
	polyline,
	time
}: ActivityCardProps) => {
	const dateOffset = formatDateDistance(new Date(date));

	const RunnerIcon = Icons.runner;
	const TrendingUpIcon = Icons.trendingUp;

	return (
		<Padded $p='md' $side='x' as='li'>
			<A.ActivityCard.Container $active={active}>
				<Padded $p='md' $side='all'>
					<A.ActivityCard.Section $active={active} onClick={onClick}>
						<A.ActivityCard.MapContainer>
							<PolylinePreview points={polyline} />
							<A.ActivityCard.MapLabel>{prettyMilliseconds(time * 1000)}</A.ActivityCard.MapLabel>
						</A.ActivityCard.MapContainer>
						<A.ActivityCard.InfoContainer>
							<A.ActivityCard.Header>
								<Box display='flex' flexDirection='row' gap={theme.spacing.sm}>
									<A.ActivityCard.Title $active={active}>{title}</A.ActivityCard.Title>
									<A.ActivityCard.TimeLabel>{dateOffset}</A.ActivityCard.TimeLabel>
								</Box>
								<Box display='flex' flexDirection='row' alignItems='center' gap={theme.spacing.xs}>
									<RunnerIcon />
									<A.ActivityCard.Type>Run Data</A.ActivityCard.Type>
									<BaseBox
										width='4px'
										height='4px'
										borderRadius='100%'
										backgroundColor={theme.colors.bg.doveGray}
									/>
									<A.ActivityCard.Metrics>Predictive</A.ActivityCard.Metrics>
								</Box>
							</A.ActivityCard.Header>
							<Padded $p='sm' $side='top'>
								<A.ActivityCard.MusicInfoContainer $active={active}>
									<Image
										rounded='md'
										height='20px'
										width='20px'
										borderRadius={theme.radii.xs}
										opacity={active ? 1 : 0.6}
										border='transparent'
										src='https://tse4.mm.bing.net/th/id/OIP.opYyEXl2x1TyK_XF1DdwlwHaHa?rs=1&pid=ImgDetMain&o=7&rm=300x300'
										alt='John Doe'
									/>

									<A.ActivityCard.MusicInfoText $active={active}>
										Hight BPM Detection - 128 BPM
									</A.ActivityCard.MusicInfoText>
									<TrendingUpIcon active={active} />
								</A.ActivityCard.MusicInfoContainer>
							</Padded>
						</A.ActivityCard.InfoContainer>
					</A.ActivityCard.Section>
				</Padded>
			</A.ActivityCard.Container>
		</Padded>
	);
};
