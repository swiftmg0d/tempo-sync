import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { blur, flex, size, text, transitionAll } from '@/styles';

const Container = styled.div<{ $flex?: number }>`
	${blur(24)}
	${flex({ direction: 'column' })}

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
		padding-top: ${theme.spacing.lg};
		padding-bottom: ${theme.spacing.md};

		@media (min-width: ${theme.breakpoints.md}) {
			padding: ${theme.spacing.xxl};
			padding-top: ${theme.spacing.xxl};
			padding-bottom: ${theme.spacing.lg};
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

const DotsContainer = styled.div`
	${flex({ direction: 'row', justifyContent: 'center', gap: 's' })}

	padding-top: ${({ theme }) => theme.spacing.md};
	padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Dot = styled.button<{ isActive: boolean; isFirst?: boolean }>`
	${({ theme, isFirst }) => css`
		${size(isFirst ? '12px' : '6px', '4px')}

		border-radius: ${theme.radii.lg};
	`}

	opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
	cursor: pointer;

	${transitionAll}
	background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.bg.teal : theme.colors.border.primaryRgb(0.3)};
`;

export const InsightCarousel = {
	Container,
	HeaderSection,
	HeaderTitle,
	DotsContainer,
	Dot
};
