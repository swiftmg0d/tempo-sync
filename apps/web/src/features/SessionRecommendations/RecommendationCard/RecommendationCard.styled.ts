import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flex, text, size, transitionAll } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm' })}
	${transitionAll}

	${({ theme }) => css`
		padding: ${theme.spacing.lg};
		background-color: ${theme.colors.bg.white(0.5)};
		border: 1px solid ${theme.colors.border.primaryRgb(0.06)};
		border-radius: ${theme.radii.md};

		&:hover {
			background-color: ${theme.colors.bg.white(0.8)};
			border-color: ${theme.colors.border.secondaryRgb(0.2)};
			box-shadow: ${theme.shadows.sm};
			transform: translateY(-1px);
		}
	`}
`;

const Header = styled.div`
	${flex({ direction: 'row', gap: 'md', alignItems: 'center' })}
`;

const AlbumArt = styled.div`
	${size('48px')}
	flex-shrink: 0;
	overflow: hidden;

	${({ theme }) => css`
		border-radius: ${theme.radii.sm};
		background-color: ${theme.colors.bg.lightSecondary};
		border: 1px solid ${theme.colors.border.primaryRgb(0.06)};
	`}

	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const TrackInfo = styled.a`
	${flex({ direction: 'column', gap: 'xs' })}

	min-width: 0;
	flex: 1;
	text-decoration: none;
	color: inherit;

	&:hover {
		text-decoration: none;
	}
`;

const TrackTitle = styled.h4`
	${text({ size: 'sm', weight: 'semibold', color: 'primary' })}

	margin: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ArtistName = styled.span`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
`;

const ActionIcon = styled.div`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const RecommendationCardStyled = {
	Container,
	Header,
	AlbumArt,
	TrackInfo,
	TrackTitle,
	ArtistName,
	ActionIcon
};
