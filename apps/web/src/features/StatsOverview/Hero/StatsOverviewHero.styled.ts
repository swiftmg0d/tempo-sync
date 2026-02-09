import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'motion/react';

import { flex, text } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column-reverse', justifyContent: 'space-between' })}

	${({ theme }) => css`
		padding-bottom: ${theme.spacing.lg};
	`}

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		${flex({ direction: 'row', justifyContent: 'space-between' })}
	}
`;

const InfoContainer = styled.div`
	${flex({ direction: 'column', gap: 'xxl' })}

	${({ theme }) => css`
		flex: 1;
		padding: ${theme.spacing.lg};
	`}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		padding: ${({ theme }) => theme.spacing['3xl']};
	}
`;

const InfoHeader = styled(motion.h2)`
	${text({ weight: 'bold', color: 'primary' })}

	${({ theme }) => css`
		font-size: clamp(${theme.fontSizes.xl}, 2vw, ${theme.fontSizes['4xl']});
	`}
`;

const InfoSubHeader = styled(motion.p)`
	${text({ weight: 'regular', color: 'secondary' })}

	${({ theme }) => css`
		max-width: 450px;
		font-size: clamp(${theme.fontSizes.md}, 1vw, ${theme.fontSizes.lg});
	`}
`;

const ButtonText = styled.span`
	${text({ weight: 'semibold' })}

	${({ theme }) => css`
		text-transform: none;
		padding: ${theme.spacing.s} ${theme.spacing.md};
		font-size: clamp(${theme.fontSizes.xs}, 1vw, ${theme.fontSizes.md});
	`}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		${({ theme }) => css`
			padding: ${theme.spacing.md} ${theme.spacing['3xl']};
		`}
	}
`;
const Image = styled.img`
	${({ theme }) => css`
		flex: 1;
		padding: ${theme.spacing['3xl']};
		filter: ${theme.mode === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none'};
	`}
`;

export const StatsOverviewHero = {
	Container,
	InfoContainer,
	InfoHeader,
	InfoSubHeader,
	ButtonText,
	Image
};
