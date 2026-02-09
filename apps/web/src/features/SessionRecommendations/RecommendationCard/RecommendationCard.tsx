import { ListMusic, Music } from 'lucide-react';

import type { RecommendationCardProps } from '../types';

import { RecommendationCardStyled as S } from './RecommendationCard.styled';

import { theme } from '@/styles';

export const RecommendationCard = ({
	trackTitle,
	artists,
	href,
	image
}: RecommendationCardProps) => {
	const artistName = artists.map((a) => a.name).join(', ');

	return (
		<S.Container>
			<S.Header>
				<S.AlbumArt>
					{image ? (
						<img src={image} alt={`${trackTitle} album art`} />
					) : (
						<Music size={32} color={theme.colors.icon.secondary} />
					)}
				</S.AlbumArt>
				<S.TrackInfo href={href} target='_blank' rel='noopener noreferrer'>
					<S.TrackTitle>{trackTitle}</S.TrackTitle>
					<S.ArtistName>{artistName}</S.ArtistName>
				</S.TrackInfo>
				<S.ActionIcon>
					<ListMusic size={18} color={theme.colors.icon.primary} />
				</S.ActionIcon>
			</S.Header>
		</S.Container>
	);
};
