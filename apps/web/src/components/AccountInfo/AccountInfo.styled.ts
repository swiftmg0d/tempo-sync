import styled from '@emotion/styled';

import { flex, text } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column' })}
`;

const Header = styled.h1`
	${text({ size: 'sm', weight: 'bold' })}
`;

const SubHeader = styled.p`
	${text({ color: 'secondary', size: 'xs' })}
`;

export const AccountInfo = {
	Container,
	Header,
	SubHeader
};
