import { InsightSummaryHero } from './Hero';
import * as I from './InsightSummary.styled';
import { Queries } from '@/hooks/quieries';
import { InsightCardList } from '../Card/Container/InsightCardList';
import { InsightCard } from '../Card';
export const InsightSummary = () => {
	const { data, isLoading } = Queries.useActivitiesSummaries();

	return (
		<I.InsightSummary.Container>
			<InsightSummaryHero buttonText='Sync Your First Activity' isLoading={isLoading} />
			<InsightCardList data={data!} isLoading={isLoading} />
			<InsightCard title='temp' icon='map' value='123' info='456' />
		</I.InsightSummary.Container>
	);
};
