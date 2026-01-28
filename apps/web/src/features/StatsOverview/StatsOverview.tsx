import { StatsOverviewCardList } from './Card/List';
import { StatsOverviewHero } from './Hero';
import * as S from './StatsOverview.styled';

import { ProfileList } from '@/components/Profile';
import { Queries } from '@/hooks/quieries';
export const StatsOverview = () => {
	const { data, isLoading } = Queries.useActivitiesSummaries();
	const { data: profiles, isLoading: isProfilesLoading } = Queries.useProfiles();

	return (
		<S.StatsOverview.Container>
			<StatsOverviewHero buttonText='Sync Your First Activity' isLoading={isLoading} />
			<StatsOverviewCardList data={data ?? []} isLoading={isLoading} />
			<ProfileList profiles={profiles ?? []} isLoading={isProfilesLoading} />
		</S.StatsOverview.Container>
	);
};
