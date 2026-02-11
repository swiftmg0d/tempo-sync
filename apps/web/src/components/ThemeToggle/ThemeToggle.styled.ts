import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ToggleButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	padding: 0;
	flex-shrink: 0;

	${({ theme }) => css`
		background-color: transparent;

		@media (hover: hover) {
			&:hover {
				background-color: ${theme.colors.bg.blackAlpha2};
			}
		}
	`}
`;
