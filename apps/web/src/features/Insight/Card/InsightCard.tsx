import * as I from './InsightCard.styled';
import type { InsightCardProps } from './types';
export const InsightCard = ({ title, description, isLoading }: InsightCardProps) => {
	return (
		<I.InsightCard.Container>
			<I.InsightCard.Header isLoading={isLoading}>{title}</I.InsightCard.Header>
			<I.InsightCard.Description isLoading={isLoading}>{description}</I.InsightCard.Description>
		</I.InsightCard.Container>
	);
};
