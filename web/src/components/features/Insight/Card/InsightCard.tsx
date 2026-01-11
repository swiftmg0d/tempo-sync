import { Icons } from '@/components/icons';
import * as I from './InsightCard.styled';
import type { InsightCardProps } from './types';

export const InsightCard = ({ icon, title, info, value, label, isLoading }: InsightCardProps) => {
	const Icon = Icons[icon];

	return (
		<I.InsightCard.Container {...(isLoading ? { 'aria-busy': true } : {})}>
			<I.InsightCard.Header>
				<I.InsightCard.IconContainer isLoading={!!isLoading}>
					<Icon active={true} width='24px' height='28px' />
				</I.InsightCard.IconContainer>
				<I.InsightCard.Title isLoading={!!isLoading}>{title}</I.InsightCard.Title>
			</I.InsightCard.Header>
			<I.InsightCard.Description>
				<I.InsightCard.ScoreContainer>
					<I.InsightCard.ScoreValue isLoading={!!isLoading}>{value}</I.InsightCard.ScoreValue>
					{label && (
						<I.InsightCard.ScoreLabel isLoading={!!isLoading}>{label}</I.InsightCard.ScoreLabel>
					)}
				</I.InsightCard.ScoreContainer>
				<I.InsightCard.Info isLoading={!!isLoading}>{info}</I.InsightCard.Info>
			</I.InsightCard.Description>
		</I.InsightCard.Container>
	);
};
