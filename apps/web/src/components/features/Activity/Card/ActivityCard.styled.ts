import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { activeContainerState, defaultContainerState } from './ActivityCard.styles';

import { defaultBorderState, flex, size, text, theme } from '@/styles';

const MusicInfoContainer = styled.div<{ $active: boolean }>`
	${flex({ direction: 'row', gap: 'sm', alignItems: 'center' })}

	border: 1px solid transparent;

	${({ $active }) => $active && defaultBorderState};
	${({ theme, $active }) => $active && `background-color:${theme.colors.bg.alto2};`}

	border-radius: ${({ theme }) => theme.radii.sm};
	padding: ${({ theme }) => theme.spacing.sm};
`;

const MusicInfoText = styled.p<{ $active?: boolean }>`
	${text({ size: 'xxs', weight: 'regular' })}

	${({ $active }) => `
		${$active ? `color: ${theme.colors.accent.primary};` : `color : ${theme.colors.text.secondary};`}
		
	`}
`;

const Container = styled.div<{ $active?: boolean }>`
	${({ theme, $active }) =>
		$active ? activeContainerState({ theme }) : defaultContainerState({ theme })}

	&:hover {
		${({ theme }) => `background-color: ${theme.colors.bg.blackAlpha2};`}

		${MusicInfoContainer} {
			${({ theme }) => defaultBorderState({ theme })}
			background-color:${({ theme }) => theme.colors.bg.alto2}
		}

		${MusicInfoText} {
			color: ${({ theme }) => theme.colors.accent.primary};
		}
	}

	border-radius: ${({ theme }) => theme.radii.sm};

	min-width: 320px;
`;

export const PulsingContainer = styled.div`
	${defaultBorderState}

	background-color: transparent;
	border-radius: ${({ theme }) => theme.radii.md};

	animation: ${keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `} 1.5s ease-in-out infinite;
`;

const Section = styled.section<{ $active?: boolean }>`
	${flex({ direction: 'row', gap: 'lg' })}

	cursor: pointer;
	user-select: none;

	transition:
		border-color 160ms ease,
		box-shadow 160ms ease,
		transform 160ms ease;

	${({ $active }) => $active && `transform: translateY(-1px) scale(1.01);`}
`;

const Header = styled.h1`
	${flex({ direction: 'column', gap: 'xs' })}
`;

const MapContainer = styled.div`
	${size('80px')}
	${defaultBorderState}
	position: relative;

	border-radius: ${theme.radii.sm};
`;

const MapLabel = styled.span`
	${text({ size: 'xxs', weight: 'semibold', color: 'primary' })}

	position: absolute;
	bottom: 4px;
	right: 4px;

	${({ theme }) => css`
		background-color: ${theme.colors.bg.white()};
		padding: 0 ${theme.spacing.sm};
		border-radius: ${theme.radii.xs};
	`}
`;

const InfoContainer = styled.div`
	${flex({ direction: 'column' })}
	flex:1
`;

const Title = styled.h1<{ $active?: boolean }>`
	${text({ size: 'sm', weight: 'semibold', color: 'primary' })}

	${({ theme, $active }) =>
		$active ? `color: ${theme.colors.text.primary};` : `color: ${theme.colors.text.secondary};`}

	max-width: none;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		max-width: 150px;
	}
`;

const TimeLabel = styled.time`
	${text({ size: 'xxs', weight: 'regular', color: 'secondary' })}

	max-width: none;
	margin-left: auto;

	white-space: wrap;
	word-wrap: break-word;
	overflow-wrap: break-word;
	text-align: right;

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		max-width: 45px;
	}
`;

const Type = styled.p`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
`;

const Metrics = styled.p`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
`;

export const ActivityCard = {
	Container,
	PulsingContainer,
	Section,
	Header,
	MusicInfoContainer,
	MusicInfoText,
	MapContainer,
	Title,
	TimeLabel,
	InfoContainer,
	Type,
	Metrics,
	MapLabel
};
