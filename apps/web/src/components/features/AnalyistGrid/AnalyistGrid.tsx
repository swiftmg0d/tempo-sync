import { MetricList } from '../Metric';

import { getMetricList } from './AnalyistGrid.utils';

import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';
import { Padded } from '@/styles';

export const AnalyistGrid = () => {
	const activeCardId = useActivityCardsStore((state) => state.activityId);

	const { data: activitySummary, isLoading } = Queries.useActivitySummary(activeCardId ?? '')();

	const { avgPace, avgHr, distance, calories } = activitySummary ?? {};

	const metricList = getMetricList(avgPace, avgHr, distance, calories);

	return (
		<Padded $p='xxl' $side='all'>
			<MetricList
				title={activitySummary?.title ?? 'Activity Metrics'}
				list={metricList}
				isLoading={isLoading}
				date={activitySummary?.date ?? new Date()}
				deviceName={activitySummary?.deviceName ?? ''}
				gear={activitySummary?.gear ?? ''}
			/>
		</Padded>
	);
};
