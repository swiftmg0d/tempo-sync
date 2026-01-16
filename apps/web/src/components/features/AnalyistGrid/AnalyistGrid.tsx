import { MetricList } from '../Metric';

import { getMetricList } from './AnalyistGrid.utils';

import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/state';
import { Padded } from '@/styles';

export const AnalyistGrid = () => {
	const activeCardId = useActivityCardsStore((state) => state.activeCardId);

	const { data: activitySummary, isLoading } = Queries.useActivitySummary(activeCardId ?? '')();

	if (!activitySummary) {
		return null;
	}

	const { avgPace, avgHr, distance, calories } = activitySummary;

	const metricList = getMetricList(avgPace, avgHr, distance, calories);

	return (
		<Padded $p='xxl' $side='all'>
			<MetricList title={activitySummary.title} list={metricList} isLoading={isLoading} />
		</Padded>
	);
};
