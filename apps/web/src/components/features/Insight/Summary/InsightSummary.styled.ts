import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
	${({ theme }) => css`
		padding: ${theme.spacing['3xl']};
	`};
`;

export const InsightSummary = {
	Container
};
