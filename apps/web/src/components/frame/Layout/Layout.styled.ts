import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { SIDEBAR_OFFSET, transitionAll } from '@/styles';

const Main = styled.main<{ $isSidebarOpen: boolean }>`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	height: 100dvh;
	overflow-y: auto;
	padding-bottom: var(--sai-bottom);

	${transitionAll}

	${({ $isSidebarOpen }) => css`
		filter: ${$isSidebarOpen ? 'blur(4px)' : 'none'};
		pointer-events: ${$isSidebarOpen ? 'none' : 'auto'};
	`}

	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		left: ${SIDEBAR_OFFSET}px;
		top: 0;
		right: 0;
		filter: none;
		pointer-events: auto;
		padding-bottom: 0;
	}
`;

export const Layout = {
	Main
};
