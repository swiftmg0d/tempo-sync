import styled from '@emotion/styled';

import { flex } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm' })}

	overflow-y: auto;
`;

export const ActivityList = {
	Container
};
