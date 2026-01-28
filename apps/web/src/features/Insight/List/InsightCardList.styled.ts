import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flex } from '@/styles';

const Container = styled.div`
	width: 100%;
	min-width: 0;
	min-height: 200px;
	overflow-x: hidden;
	overflow-y: visible;
`;

const CardsContainer = styled.div<{ $currentSlide: number }>`
	${flex({ direction: 'row' })}

	width: 100%;
	transition: transform 0.3s ease-out;
	transform: ${({ $currentSlide }) => `translateX(-${$currentSlide * 100}%)`};

	padding-bottom: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const CardWrapper = styled.div`
	padding: ${({ theme }) => theme.spacing.xs};
	max-height: 100%;
	width: 100%;
	flex-shrink: 0;

	box-sizing: border-box;

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		width: 50%;
	}
`;

const EmptyMessage = styled.p`
	${({ theme }) => css`
		color: ${theme.colors.text.secondary};
		font-size: ${theme.fontSizes.sm};
		text-align: center;
		padding: ${theme.spacing.md} 0;
	`}
`;

export const InsightCardList = {
	Container,
	CardsContainer,
	CardWrapper,
	EmptyMessage
};
