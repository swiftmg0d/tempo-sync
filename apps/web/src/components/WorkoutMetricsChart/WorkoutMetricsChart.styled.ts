import styled from '@emotion/styled';

import { text, theme } from '@/styles';

const Container = styled.div`
	width: 100%;
	overflow: hidden;
`;

const HeaderSection = styled.section``;

const HeaderTitle = styled.h2`
	${text({ size: 'lg', weight: 'bold', color: 'primary' })}

	text-align: center;

	@media (min-width: ${theme.breakpoints.md}) {
		text-align: left;
	}
`;
const HeaderSubtitle = styled.p`
	${text({ size: 'sm', weight: 'medium', color: 'secondary' })}

	text-wrap: balance;
	text-align: center;

	@media (min-width: ${theme.breakpoints.md}) {
		text-align: left;
	}
`;

export const WorkoutMetricsChartStyled = {
	Container,
	HeaderSection,
	HeaderTitle,
	HeaderSubtitle
};
