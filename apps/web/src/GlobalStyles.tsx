import { Global, css, type Theme } from '@emotion/react';

export const GlobalStyles = () => {
	return (
		<Global
			styles={(theme: Theme) => css`
				*,
				*::before,
				*::after {
					box-sizing: border-box;
				}

				::view-transition-old(root),
				::view-transition-new(root) {
					animation-duration: 200ms;
					animation-timing-function: ease-in-out;
				}

				html,
				body {
					height: 100%;
				}

				body {
					margin: 0;
					font-family: ${theme.fonts.sans};
					color: ${theme.colors.text.primary};
					background-color: ${theme.colors.bg.lightPrimary()};
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				#root {
					height: 100%;
				}
				*:focus-within {
					outline: none;
					box-shadow: none;
				}

				&::selection {
					background-color: ${theme.colors.bg.teal};
					color: white;
				}
			`}
		/>
	);
};
