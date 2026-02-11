import { Box } from '@chakra-ui/react';

import { MetricList } from '../../components/Metric';
import { InsightCarousel } from '../Insight/Carousel/InsightCarousel';
import { SessionRecommendations } from '../SessionRecommendations';
import { TrackLeaderboard } from '../TrackLeaderboard';

import { getMetricList } from './AnalyistGrid.utils';

import { WorkoutMetricsChart } from '@/components/WorkoutMetricsChart';
import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';
import { Padded, theme } from '@/styles';

export const AnalyistGrid = () => {
	const activeCardId = useActivityCardsStore((state) => state.activityId);

	const { data: activitySummary, isLoading } = Queries.useActivitySummary(activeCardId ?? '')();

	const { avgPace, avgHr, distance, calories } = activitySummary ?? {};

	const metricList = getMetricList(avgPace, avgHr, distance, calories);

	return (
		<Padded $p='xl' $side='all'>
			<Box
				display='flex'
				gap={theme.spacing.md}
				flexDirection='column'
				md={{ gap: theme.spacing.xxl }}
			>
				<MetricList
					title={activitySummary?.title ?? 'Activity Metrics'}
					list={metricList}
					isLoading={isLoading}
					date={activitySummary?.date ?? new Date()}
					deviceName={activitySummary?.deviceName ?? ''}
					gear={activitySummary?.gear ?? ''}
				/>

				<Box
					display='flex'
					flexDirection='column'
					xl={{ flexDirection: 'row' }}
					gap={theme.spacing.md}
				>
					<Box flex={1} minWidth={0} padding={theme.spacing.lg}>
						<WorkoutMetricsChart />
					</Box>
					<Box flex={1 / 2} minWidth={0} padding={theme.spacing.lg}>
						<TrackLeaderboard />
					</Box>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					xl={{ flexDirection: 'row' }}
					gap={theme.spacing.lg}
				>
					<Box flex={1 / 2} minWidth={0}>
						<SessionRecommendations />
					</Box>
					<InsightCarousel flex={1} />
				</Box>
			</Box>
		</Padded>
	);
};
