import styled from '@emotion/styled';

import { SIDEBAR_OFFSET } from '@/styles';

const Main = styled.main`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;

	height: 100dvh;
	overflow-y: auto;

	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		left: ${SIDEBAR_OFFSET}px;
		top: 0;
		right: 0;
	}
`;

export const Layout = {
	Main
};
