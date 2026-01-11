import { blur, defaultBorderState, flex, size, text, transitionAll } from '@/styles';
import { baseColors } from '@/styles/theme/colors';
import { withSkeleton } from '@/utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InsightCardSkeleton } from './InsighCard.skeleton';

const ScoreContainer = styled.div`
	${flex({ direction: 'row', gap: 'sm' })}
`;

const ScoreValueStyled = styled.span`
	${text({ weight: 'bold', size: '3xl', color: 'primary' })}
`;
const ScoreLabelStyled = styled.span`
	${text({ weight: 'regular', size: 'sm', color: 'secondary' })}

	align-self: center;
	padding-top: ${({ theme }) => theme.spacing.sm};
`;

const Container = styled.div`
	${flex({ direction: 'column', gap: 'lg' })}
	${defaultBorderState}
    ${transitionAll}
    ${blur(20)}

	${({ theme }) => css`
		flex: 1;
		min-width: 300px;
		padding: ${theme.spacing.xl};
		gap: ${theme.spacing.lg};
		border-radius: ${theme.radii.lg};
		background-color: ${theme.colors.bg.white(0.7)};
	`};

	&:hover {
		border-color: ${baseColors.teal(0.3)};
		box-shadow: ${({ theme }) => theme.shadows.lg};
		border-width: 2px;
	}

	&:hover ${ScoreValueStyled} {
		color: ${({ theme }) => theme.colors.text.teal};
	}
`;

const IconContainerStyled = styled.div`
	${size('40px')}
	${flex({ direction: 'row', alignItems: 'center', justifyContent: 'center' })}

    ${({ theme }) => css`
		border-radius: ${theme.radii.sm};
		padding: ${theme.spacing.s};
	`};

	background-color: ${baseColors.teal(0.1)};
`;

const Header = styled.h2`
	${flex({ direction: 'row', alignItems: 'center', justifyContent: 'space-between' })}
`;

const TitleStyled = styled.span`
	${text({ weight: 'semibold', size: 'xs', color: 'secondary' })}

	text-transform: uppercase;
`;

const Description = styled.section`
	${flex({ direction: 'column', gap: 'xs' })}
`;

const InfoStyled = styled.p`
	${text({ weight: 'regular', size: 'xs', color: 'secondary' })};
`;

const Title = withSkeleton(TitleStyled, InsightCardSkeleton.TitleSkleton);
const Info = withSkeleton(InfoStyled, InsightCardSkeleton.InfoSkeleton);
const ScoreLabel = withSkeleton(ScoreLabelStyled, InsightCardSkeleton.ScoreLabelSkeleton);
const ScoreValue = withSkeleton(ScoreValueStyled, InsightCardSkeleton.ScoreValueSkeleton);
const IconContainer = withSkeleton(IconContainerStyled, InsightCardSkeleton.IconContainerSkeleton);

export const InsightCard = {
	Container,
	IconContainer,
	Header,
	Description,
	Title,
	ScoreValue,
	ScoreLabel,
	ScoreContainer,
	Info
};
