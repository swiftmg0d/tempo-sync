import { StatsOverviewCardList } from './Card/List';
import { StatsOverviewHero } from './Hero';
import * as S from './StatsOverview.styled';

import { Queries } from '@/hooks/quieries';
export const StatsOverview = () => {
	const { data, isLoading } = Queries.useActivitiesSummaries();

	return (
		<S.StatsOverview.Container>
			<StatsOverviewHero buttonText='Sync Your First Activity' isLoading={isLoading} />
			<StatsOverviewCardList data={data ?? []} isLoading={isLoading} />
		</S.StatsOverview.Container>
	);
};
