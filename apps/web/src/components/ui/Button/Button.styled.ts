import { theme, flex, defaultBorderState, transitionAll } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { StyledButtonProps } from './types';

export const StyledButton = styled.button<StyledButtonProps>`
	${transitionAll}

	${({ $active, $disabled }) =>
		$active
			? css`
					color: ${theme.colors.text.alabaster};
					background-color: ${theme.colors.bg.teal};
					box-shadow: ${theme.shadows.button.activeGlow};

					&:hover {
						opacity: 0.95;
						box-shadow: ${theme.shadows.lg};

						}
					}
				`
			: css`
					color: ${theme.colors.text.secondary};
					background-color: ${theme.colors.bg.lightSecondary};

					${!$disabled &&
					css`
						:hover {
							color: ${theme.colors.text.primary};
							background-color: ${theme.colors.bg.blackAlpha2};
							path {
								fill: ${theme.colors.accent.primary};
							}
						}
					`}
				`}

	${({ $paddingX, $paddingY, theme }) => css`
		padding: ${$paddingX && theme.spacing[$paddingX]} ${$paddingY && theme.spacing[$paddingY]};
	`}

	${({ $width, $height }) => css`
		${$width ? `max-width: ${$width};` : ''}
		${$height ? `min-height: ${$height};` : ''}
	`};

	${({ $variant }) => ($variant === 'border' ? defaultBorderState : '')}

	${({ $disabled }) => `
		opacity: ${$disabled ? 0.5 : 1};
	`}

	max-height: 35px;
	border-radius: ${theme.radii.sm};
	font-size: clamp(${theme.fontSizes.xxs}, 2vw, ${theme.fontSizes.xs});
	font-weight: ${theme.fontWeights.bold};
	text-transform: uppercase;
	cursor: pointer;

	${flex({ direction: 'row', alignItems: 'center', gap: 'sm', justifyContent: 'center' })}
	flex: 1;

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		flex: 0 1 auto;
		${flex({ direction: 'row', alignItems: 'center', gap: 'sm' })}
	}
`;
