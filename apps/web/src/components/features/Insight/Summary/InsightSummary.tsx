import { InsightSummaryHero } from './Hero';
import * as I from './InsightSummary.styled';
import { Queries } from '@/hooks/quieries';
import { InsightCardList } from '../Card/Container/InsightCardList';
export const InsightSummary = () => {
	const { data, isLoading } = Queries.useActivitiesSummaries();

	return (
		<I.InsightSummary.Container>
			<InsightSummaryHero buttonText='Sync Your First Activity' isLoading={isLoading} />
			<InsightCardList data={data!} isLoading={isLoading} />
		</I.InsightSummary.Container>
	);
};
