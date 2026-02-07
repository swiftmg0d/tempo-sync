import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InsightCardSkeleton } from './InsightCard.skeleton';

import { flex, text, transitionAll } from '@/styles';
import { withSkeleton } from '@/utils';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm' })}
	${transitionAll}

	height: 100%;
	min-height: 150px;

	${({ theme }) => css`
		padding: ${theme.spacing.md};
		background-color: ${theme.colors.bg.white(0.4)};
		border: 1px solid ${theme.colors.border.primaryRgb(0.04)};
		border-radius: ${theme.radii.lg};
		box-shadow: ${theme.shadows.sm};

		@media (min-width: ${theme.breakpoints.md}) {
			padding: ${theme.spacing.lg};
			min-height: 160px;
		}

		@media (min-width: ${theme.breakpoints.xl}) {
			padding: ${theme.spacing.xl};
			min-height: 180px;
		}

		&:hover {
			box-shadow: ${theme.shadows.lg};
		}
	`}
`;
const HeaderStyled = styled.h3`
	${text({ size: 'xs', weight: 'bold', color: 'primary' })}

	${({ theme }) => css`
		@media (min-width: ${theme.breakpoints.md}) {
			font-size: ${theme.fontSizes.sm};
		}
	`}
`;

const DescriptionStyled = styled.p`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}

	${({ theme }) => css`
		line-height: 1.6;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 7;
		-webkit-box-orient: vertical;
		overflow: hidden;

		@media (min-width: ${theme.breakpoints.md}) {
			font-size: ${theme.fontSizes.sm};
		}
	`}
`;

const Header = withSkeleton(HeaderStyled, InsightCardSkeleton.Header);
const Description = withSkeleton(DescriptionStyled, InsightCardSkeleton.Description);

export const InsightCard = {
	Container,
	Header,
	Description
};
