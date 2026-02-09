import { css } from '@emotion/react';

import { theme } from '@/styles';

export const scrollbar = css`
	/* Firefox */
	scrollbar-width: thin;
	scrollbar-color: ${theme.colors.accent.teal50} transparent;

	/* WebKit (Chrome/Safari/Edge) */
	&::-webkit-scrollbar {
		width: 3px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${theme.colors.border.primaryRgb(0.18)};
		border-radius: 999px;
		border: 3px solid transparent;

		-webkit-background-clip: content-box;
		background-clip: content-box;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: ${theme.colors.border.primaryRgb(0.28)};
	}
`;
