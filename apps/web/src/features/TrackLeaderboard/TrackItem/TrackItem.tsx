import { Music } from 'lucide-react';

import type { TrackItemProps } from '../types';

import { TrackItemStyled as S } from './TrackItem.styled';

import { theme } from '@/styles';

export const TrackItem = ({
	rank,
	trackName,
	artist,
	score,
	bpm,
	insightLabel,
	insightDescription,
	image
}: TrackItemProps) => {
	return (
		<S.Container>
			<S.RankBadge $first={rank === 1}>{rank}</S.RankBadge>
			<S.Header>
				<S.AlbumArt>
					{image ? (
						<img src={image} alt={trackName} />
					) : (
						<Music size={20} color={theme.colors.icon.primary} />
					)}
				</S.AlbumArt>
				<S.TrackInfo>
					<S.TrackName>
						{trackName} - {artist}
					</S.TrackName>
					<S.MetaRow>
						<S.ScoreBadge>{score} Score</S.ScoreBadge>
						<S.BpmLabel>{bpm} BPM</S.BpmLabel>
					</S.MetaRow>
				</S.TrackInfo>
			</S.Header>
			<S.Divider />
			<S.InsightText>
				<strong>{insightLabel}:</strong> {insightDescription}
			</S.InsightText>
		</S.Container>
	);
};
