import { activeBorderState, defaultBorderState, size } from '@/styles';
import type { AppTheme } from '@/styles';
import { css } from '@emotion/react';

export const defaultContainerState = ({ theme }: { theme: AppTheme }) => css`
	${defaultBorderState({ theme })}
	border-radius: 70px;
`;

export const activeContainerState = ({ theme }: { theme: AppTheme }) => css`
	${activeBorderState({ theme })}

	box-shadow: ${theme.shadows.container.activeGlow};

	&::before {
		${size('10px', '25px')}

		content: '';
		position: absolute;

		left: 0;
		top: 50%;
		transform: translate(-70%, -50%);

		border-radius: 10px;
		background-color: ${theme.colors.accent.primary};
	}
`;
