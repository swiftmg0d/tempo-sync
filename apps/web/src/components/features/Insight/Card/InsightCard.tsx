import * as I from './InsightCard.styled';
import type { InsightCardProps } from './types';

import { Icons, type IconName } from '@/components/icons';

export const InsightCard = ({ icon, title, info, value, label, isLoading }: InsightCardProps) => {
	const iconKey = icon as IconName;
	const Icon = Icons[iconKey];

	return (
		<I.InsightCard.Container {...(isLoading ? { 'aria-busy': true } : {})}>
			<I.InsightCard.Header>
				<I.InsightCard.IconContainer isLoading={!!isLoading}>
					<Icon active width='24px' height='28px' />
				</I.InsightCard.IconContainer>
				<I.InsightCard.Title isLoading={!!isLoading}>{title}</I.InsightCard.Title>
			</I.InsightCard.Header>
			<I.InsightCard.Description>
				<I.InsightCard.ScoreContainer>
					<I.InsightCard.ScoreValue isLoading={!!isLoading}>{value}</I.InsightCard.ScoreValue>
					{label ? (
						<I.InsightCard.ScoreLabel isLoading={!!isLoading}>{label}</I.InsightCard.ScoreLabel>
					) : null}
				</I.InsightCard.ScoreContainer>
				<I.InsightCard.Info isLoading={!!isLoading}>{info}</I.InsightCard.Info>
			</I.InsightCard.Description>
		</I.InsightCard.Container>
	);
};
