import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
	${({ theme }) => css`
		padding: ${theme.spacing.lg};

		@media (min-width: ${theme.breakpoints.md}) {
			padding: ${theme.spacing['3xl']};
		}
	`};
`;

export const StatsOverview = {
	Container
};
