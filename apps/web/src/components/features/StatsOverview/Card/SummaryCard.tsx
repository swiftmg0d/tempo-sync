import * as S from './StatsOverviewCard.styled';
import type { StatsOverviewCardProps } from './types';

import { Icons, type IconName } from '@/components/icons';

export const StatsOverviewCard = ({
	icon,
	title,
	info,
	value,
	label,
	isLoading
}: StatsOverviewCardProps) => {
	const iconKey = icon as IconName;
	const Icon = Icons[iconKey];

	return (
		<S.StatsOverviewCard.Container {...(isLoading ? { 'aria-busy': true } : {})}>
			<S.StatsOverviewCard.Header>
				<S.StatsOverviewCard.IconContainer isLoading={!!isLoading}>
					<Icon active width='24px' height='28px' />
				</S.StatsOverviewCard.IconContainer>
				<S.StatsOverviewCard.Title isLoading={!!isLoading}>{title}</S.StatsOverviewCard.Title>
			</S.StatsOverviewCard.Header>
			<S.StatsOverviewCard.Description>
				<S.StatsOverviewCard.ScoreContainer>
					<S.StatsOverviewCard.ScoreValue isLoading={!!isLoading}>
						{value}
					</S.StatsOverviewCard.ScoreValue>
					{label ? (
						<S.StatsOverviewCard.ScoreLabel isLoading={!!isLoading}>
							{label}
						</S.StatsOverviewCard.ScoreLabel>
					) : null}
				</S.StatsOverviewCard.ScoreContainer>
				<S.StatsOverviewCard.Info isLoading={!!isLoading}>{info}</S.StatsOverviewCard.Info>
			</S.StatsOverviewCard.Description>
		</S.StatsOverviewCard.Container>
	);
};
