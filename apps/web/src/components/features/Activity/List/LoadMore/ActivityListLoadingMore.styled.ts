import styled from '@emotion/styled';

import { flex, text, transitionAll } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'row', alignItems: 'center', justifyContent: 'center', gap: 'xs' })}
	${transitionAll}
    
	padding: ${({ theme }) => theme.spacing.md};
	opacity: 0.7;
	cursor: default;

	&:hover {
		opacity: 1;
	}
`;
const Text = styled.p`
	${text({ size: 'xxs', color: 'secondary', weight: 'medium' })}

	text-align: center;
`;

export const ActivityListLoadingMore = {
	Container,
	Text
};
