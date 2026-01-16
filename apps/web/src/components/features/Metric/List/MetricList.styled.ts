import styled from '@emotion/styled';
import { motion } from 'motion/react';

import { defaultBorderState, flex, text } from '@/styles';

const Section = styled(motion.section)`
	${flex({ direction: 'column', gap: 'lg' })}
	${defaultBorderState}

	border-radius:  ${({ theme }) => theme.radii.lg};
	background-color: ${({ theme }) => theme.colors.bg.white(0.7)};
	padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.h2`
	${text({ color: 'primary', weight: 'bold', size: 'xl' })}

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		white-space: normal;
		overflow: visible;
		text-overflow: clip;
	}
`;

const CardsContainer = styled.div`
	${flex({ direction: 'row', gap: 'lg', alignItems: 'center' })}

	overflow-x: auto;
	-webkit-overflow-scrolling: touch;

	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		overflow-x: hidden;
	}
`;

export const MetricList = { Section, Header, CardsContainer };
