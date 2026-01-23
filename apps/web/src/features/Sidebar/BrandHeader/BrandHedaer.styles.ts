import { css, keyframes } from '@emotion/react';

import { theme } from '@/styles';

const wave = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
`;

export const pulseWaveBaseCss = (type: 'base' | 'skeleton') => css`
	${type === 'base'
		? `background-color: ${theme.colors.bg.teal};`
		: `background-color: ${theme.colors.skeleton.base};`}

	position: relative;
	width: 8px;
	height: 8px;
	border-radius: 50%;

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background-color: inherit;

		animation: ${wave} 1.5s infinite;
	}
`;
