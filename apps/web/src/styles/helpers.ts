import { css } from '@emotion/react';

import { theme, type AppTheme } from './theme';

import type { FlexProperties, TextProperties } from '@/types/styles';

export const flex =
	({ direction, gap, alignItems, justifyContent }: FlexProperties) =>
	({ theme }: { theme: AppTheme }) => css`
		display: flex;
		flex-direction: ${direction};
		${gap ? `gap: ${theme.spacing[gap]};` : ''}
		${alignItems ? `align-items: ${alignItems};` : ''}
		${justifyContent ? `justify-content: ${justifyContent};` : ''}
	`;

export const size = (width: string, height: string = width) => {
	return css`
		${height ? `height: ${height};` : ''}
		${width ? `width: ${width};` : ''}
	`;
};

export const text =
	({ color, size, weight }: TextProperties) =>
	({ theme }: { theme: AppTheme }) => css`
		${color ? `color: ${theme.colors.text[color]};` : ''}
		${size ? `font-size: ${theme.fontSizes[size]};` : ''}
		${weight ? `font-weight: ${theme.fontWeights[weight]};` : ''}
	`;

export const defaultBorderState = ({ theme }: { theme: AppTheme }) => css`
	border: 1px solid ${theme.colors.border.primaryRgb(0.08)};
`;

export const activeBorderState = ({ theme }: { theme: AppTheme }) => css`
	border: 1px solid ${theme.colors.border.secondaryRgb(0.3)};
`;

export const transitionAll = css`
	transition-property: all;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;
`;

export const blur = (amount = 5) => css`
	backdrop-filter: blur(${amount}px);
	-webkit-backdrop-filter: blur(${amount}px);
`;

export const mobileOnly = css`
	display: block;
	@media (min-width: ${theme.breakpoints.md}) {
		display: none;
	}
`;

export const desktopOnly = css`
	display: none;
	@media (min-width: ${theme.breakpoints.xl}) {
		display: block;
	}
`;

export const transition = (duration = 0.5) => {
	return {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
		transition: { duration: duration }
	};
};
