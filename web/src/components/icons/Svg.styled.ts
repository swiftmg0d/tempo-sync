import styled from '@emotion/styled';

export const StyledSvg = styled.svg<{ $width?: string; $height?: string; $hover?: boolean }>`
	width: ${({ $width }) => $width};
	height: ${({ $height }) => $height ?? 'auto'};
	cursor: pointer;
`;
