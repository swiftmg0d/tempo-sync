import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { blur, flex, text } from '@/styles';

const slideDown = keyframes`
	0% {
		transform: translateY(-4px);
		opacity: 0.6;
	}
	50% {
		transform: translateY(4px);
		opacity: 1;
	}
	100% {
		transform: translateY(-4px);
		opacity: 0.6;
	}
`;

const Container = styled.div<{ $flex?: number }>`
	${blur(24)}
	box-sizing: border-box;
	width: 100%;
	min-width: 0;

	flex: ${({ $flex }) => $flex ?? 1};
	display: flex;
	flex-direction: column;
	min-height: clamp(280px, 40dvh, 360px);

	${({ theme }) => css`
		background-color: ${theme.colors.bg.white(0.8)};
		border: 1px solid ${theme.colors.border.primaryRgb(0.05)};
		border-radius: ${theme.radii.lg};
		box-shadow: ${theme.shadows.sm};

		padding: ${theme.spacing.lg} ${theme.spacing.md};

		@media (min-width: ${theme.breakpoints.md}) {
			padding: ${theme.spacing.xxl};
		}
	`};
`;

const HeaderSection = styled.section`
	${flex({ direction: 'row', alignItems: 'center', gap: 'sm' })}

	padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const HeaderTitle = styled.h2`
	${text({ size: 'sm', weight: 'bold', color: 'primary' })}

	text-transform: uppercase;
`;

const TrackList = styled.div`
	${flex({ direction: 'column', gap: 'md' })}
	flex: 1;
	overflow-x: hidden;
	overflow-y: auto;
	max-height: clamp(220px, 45dvh, 440px);
	padding: 8px 8px 0;

	mask-image: linear-gradient(to bottom, black calc(100% - 40px), transparent 100%);
	-webkit-mask-image: linear-gradient(to bottom, black calc(100% - 40px), transparent 100%);

	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const EmptyState = styled.div`
	${flex({ direction: 'column', alignItems: 'center', justifyContent: 'center', gap: 'md' })}
	height: 100%;
	flex: 1;

	text-align: center;
	padding: ${({ theme }) => theme.spacing.xxl};

	> div {
		opacity: 0.4;
		animation: ${slideDown} 2.5s ease-in-out infinite;
	}
`;

const EmptyStateTitle = styled.h3`
	${text({ size: 'sm', weight: 'semibold', color: 'primary' })}
	margin: 0;
`;

const EmptyStateText = styled.p`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
	margin: 0;
	max-width: 220px;
`;

export const TrackLeaderboardStyled = {
	Container,
	HeaderSection,
	HeaderTitle,
	TrackList,
	EmptyState,
	EmptyStateTitle,
	EmptyStateText
};
