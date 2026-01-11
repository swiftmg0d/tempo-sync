import { flex } from '@/styles';
import styled from '@emotion/styled';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm' })}

	overflow-y: auto;
`;

export const ActivityList = {
	Container
};
