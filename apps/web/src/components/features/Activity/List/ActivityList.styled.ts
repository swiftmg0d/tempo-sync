import styled from '@emotion/styled';

import { flex } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm' })}
	padding-bottom: ${({ theme }) => theme.spacing.s};
	padding-top: ${({ theme }) => theme.spacing.s};

	overflow-y: auto;
`;

export const ActivityList = {
	Container
};
