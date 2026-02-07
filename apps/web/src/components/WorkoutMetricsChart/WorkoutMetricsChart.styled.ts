import styled from '@emotion/styled';

import { text } from '@/styles';

const Container = styled.div``;

const HeaderSection = styled.section``;

const HeaderTitle = styled.h2`
	${text({ size: 'lg', weight: 'bold', color: 'primary' })}
`;
const HeaderSubtitle = styled.p`
	${text({ size: 'sm', weight: 'medium', color: 'secondary' })}

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const WorkoutMetricsChartStyled = {
	Container,
	HeaderSection,
	HeaderTitle,
	HeaderSubtitle
};
