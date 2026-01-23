import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'motion/react';

import { flex, text } from '@/styles';

const Container = styled(motion.section)`
	${flex({ direction: 'column', justifyContent: 'center' })}

	${({ theme }) => css`
		padding: ${theme.spacing.lg};
	`};

	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		display: block;
		padding: ${({ theme }) => theme.spacing['3xl']};
	}
`;

const InfoContainer = styled.div`
	${flex({ direction: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 'sm' })};

	${({ theme }) => css`
		padding: ${theme.spacing.lg};
	`};

	@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
		${flex({ direction: 'column', justifyContent: 'center', alignItems: 'center', gap: 'sm' })};

		text-align: center;
		padding: ${({ theme }) => theme.spacing['3xl']};
	}
`;

const InfoHeader = styled(motion.h2)`
	${text({ weight: 'bold', color: 'primary' })}

	${({ theme }) => css`
		font-size: clamp(${theme.fontSizes.xl}, 2vw, ${theme.fontSizes['4xl']});
	`};
`;

const InfoSubHeader = styled(motion.p)`
	${text({ weight: 'regular', color: 'secondary' })}

	${({ theme }) => css`
		font-size: clamp(${theme.fontSizes.md}, 1vw, ${theme.fontSizes.lg});
	`}

	max-width: 520px;
`;

export const StatsOverviewEmpty = {
	Container,
	InfoContainer,
	InfoHeader,
	InfoSubHeader
};
