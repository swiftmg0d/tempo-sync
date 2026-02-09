import { Box as BaseBox, Box, Image } from '@chakra-ui/react';
import prettyMilliseconds from 'pretty-ms';

import * as A from './ActivityCard.styled';
import { noTracksImage } from './constants';
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
	time,
	lastTrack,
	totalElevationGain
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
										marginX={theme.spacing.s}
									/>
									<A.ActivityCard.Metrics $active={active}>
										{totalElevationGain ? `↑ ${totalElevationGain}m` : '—'}
									</A.ActivityCard.Metrics>
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
										src={lastTrack?.image ?? noTracksImage}
										alt={lastTrack?.name ?? 'No track data'}
									/>

									<A.ActivityCard.MusicInfoText $active={active}>
										{lastTrack?.name ?? 'No track data'}
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
