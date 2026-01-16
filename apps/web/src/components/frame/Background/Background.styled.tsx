import styled from '@emotion/styled';

const Container = styled.div`
	position: fixed;
	inset: 0;
	z-index: -10;
	overflow: hidden;
	background-color: ${(props) => props.theme.colors.bg.lightPrimary()};
`;

export const Background = {
	Container
};
