import { flex, size, text } from '@/styles';
import styled from '@emotion/styled';

const Container = styled.div`
	${flex({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}

	height: 100%;
`;

const IconContainer = styled.div`
	${size('64px')}
	${flex({ direction: 'row', alignItems: 'center', justifyContent: 'center' })}

	border-radius: 9999px;
	background-color: ${({ theme }) => theme.colors.bg.alto2};
`;

const Title = styled.h2`
	${text({ color: 'primary', size: 'sm', weight: 'regular' })}
`;

const Description = styled.p`
	${text({ color: 'secondary', size: 'xs', weight: 'regular' })}

	max-width: 200px;
	text-align: center;
`;

export const ActivityListEmptyState = {
	Container,
	IconContainer,
	Title,
	Description
};
