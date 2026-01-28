import styled from '@emotion/styled';

import { flex, text } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column' })}
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Header = styled.h1`
	${text({ size: 'lg', weight: 'bold', color: 'primary' })}
	text-align: center;
`;

const Description = styled.p`
	${text({ size: 'md', weight: 'regular', color: 'secondary' })}
	text-align: center;
	margin-top: 8px;
`;

export const ErrorPage = {
	Container,
	Header,
	Description
};
