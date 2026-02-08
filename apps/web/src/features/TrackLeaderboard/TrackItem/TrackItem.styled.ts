import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flex, text, size } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm' })}

	position: relative;

	${({ theme }) => css`
		padding: ${theme.spacing.lg};
		background-color: ${theme.colors.bg.white(0.5)};
		border: 1px solid ${theme.colors.border.primaryRgb(0.06)};
		border-radius: ${theme.radii.md};
	`}
`;

const RankBadge = styled.div<{ $first: boolean }>`
	position: absolute;
	top: -8px;
	right: -8px;
	${size('24px')}

	${({ theme, $first }) => css`
		background-color: ${$first ? theme.colors.bg.teal : theme.colors.bg.slate(0.7)};

		color: ${theme.colors.text.alabaster};
		border-radius: 50%;
		font-size: ${theme.fontSizes.xs};
		font-weight: ${theme.fontWeights.bold};
	`}

	display: flex;
	align-items: center;
	justify-content: center;
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

const TrackInfo = styled.div`
	${flex({ direction: 'column', gap: 'xs' })}

	min-width: 0;
`;

const TrackName = styled.h4`
	${text({ size: 'sm', weight: 'semibold', color: 'primary' })}

	margin: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const MetaRow = styled.div`
	${flex({ direction: 'row', gap: 'sm', alignItems: 'center' })}
`;

const ScoreBadge = styled.span`
	${text({ size: 'xs', weight: 'bold', color: 'alabaster' })}

	display: inline-flex;
	align-items: center;
	padding: 2px 8px;

	${({ theme }) => css`
		background-color: ${theme.colors.bg.teal};
		border-radius: ${theme.radii.xs};
	`}
`;

const BpmLabel = styled.span`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
`;

const Divider = styled.hr`
	width: 100%;
	margin: 0;

	${({ theme }) => css`
		border: none;
		border-top: 1px dashed ${theme.colors.border.primaryRgb(0.15)};
	`}
`;

const InsightText = styled.p`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}

	margin: 0;
	line-height: 1.5;

	strong {
		${text({ size: 'xs', weight: 'semibold', color: 'teal' })}
	}
`;

export const TrackItemStyled = {
	Container,
	RankBadge,
	Header,
	AlbumArt,
	TrackInfo,
	TrackName,
	MetaRow,
	ScoreBadge,
	BpmLabel,
	Divider,
	InsightText
};
