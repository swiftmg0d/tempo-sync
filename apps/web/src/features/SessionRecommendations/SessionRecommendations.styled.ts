import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { blur, flex, text, transitionAll } from '@/styles';

const Container = styled.div<{ $flex?: number }>`
	${blur(24)}
	box-sizing: border-box;
	width: 100%;
	min-width: 0;

	flex: ${({ $flex }) => $flex ?? 1};

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
	overflow-y: auto;
	max-height: 310px;

	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}

	mask-image: linear-gradient(to bottom, black calc(100% - 40px), transparent 100%);
	-webkit-mask-image: linear-gradient(to bottom, black calc(100% - 40px), transparent 100%);
`;

const EmptyState = styled.div`
	${flex({ direction: 'column', alignItems: 'center', justifyContent: 'center', gap: 'md' })}
	height: 100%;
	flex: 1;

	text-align: center;
	padding: ${({ theme }) => theme.spacing.lg};

	> div {
		opacity: 0.4;
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

const LoadMoreTrigger = styled.div`
	${flex({ direction: 'row', justifyContent: 'center', alignItems: 'center', gap: 'xs' })}
	${transitionAll}
	min-height: 32px;
	opacity: 0.7;
	cursor: default;

	&:hover {
		opacity: 1;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.spinner {
		animation: spin 1s linear infinite;
	}
`;

const StatusText = styled.p`
	${text({ size: 'xxs', weight: 'medium', color: 'secondary' })}
	text-align: center;
`;

const EndOfList = styled.div`
	${flex({ direction: 'column', gap: 'sm', justifyContent: 'center', alignItems: 'center' })}

	${({ theme }) => css`
		padding-top: ${theme.spacing.xl};
		padding-bottom: ${theme.spacing.sm};
	`};
`;

const EndOfListDivider = styled.div`
	height: 1px;
	flex: 1;
	background: linear-gradient(
		to right,
		transparent,
		${({ theme }) => theme.colors.border.primaryRgb(0.1)},
		transparent
	);
`;

const EndOfListIconRow = styled.div`
	${flex({ direction: 'row', alignItems: 'center' })}
	width: 100%;
	gap: ${({ theme }) => theme.spacing.sm};
`;

export const SessionRecommendationsStyled = {
	Container,
	HeaderSection,
	HeaderTitle,
	TrackList,
	EmptyState,
	EmptyStateTitle,
	EmptyStateText,
	LoadMoreTrigger,
	StatusText,
	EndOfList,
	EndOfListDivider,
	EndOfListIconRow
};
