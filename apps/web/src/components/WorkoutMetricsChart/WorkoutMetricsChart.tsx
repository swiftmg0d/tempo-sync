import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { ButtonGroup } from '../ButtonGroup';
import { LineChart } from '../LineChart';
import type { ChartData } from '../LineChart/types';

import * as W from './WorkoutMetricsChart.styled';
import { chartTypeMapper } from './constants';

import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';
import { theme } from '@/styles';

export const WorkoutMetricsChart = () => {
	const activityId = useActivityCardsStore((state) => state.activityId);
	const [chartType, setChartType] = useState<'pace_cadence' | 'heart_rate_tempo'>('pace_cadence');

	const { data, isLoading } = Queries.useActivityStreams(
		activityId ?? '',
		chartTypeMapper[chartType]
	)({
		enabled: !!activityId
	});

	return (
		<W.WorkoutMetricsChartStyled.Container>
			<Box display='flex' flexDirection='column'>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					gap={theme.spacing.lg}
					md={{
						flexDirection: 'row'
					}}
				>
					{/* Header Section */}

					<W.WorkoutMetricsChartStyled.HeaderSection>
						<W.WorkoutMetricsChartStyled.HeaderTitle>
							Detailed Performace Metrics
						</W.WorkoutMetricsChartStyled.HeaderTitle>
						<W.WorkoutMetricsChartStyled.HeaderSubtitle>
							Cross-refrencing biometric and audio aligment data
						</W.WorkoutMetricsChartStyled.HeaderSubtitle>
					</W.WorkoutMetricsChartStyled.HeaderSection>

					{/* Placeholder for future chart components */}
					<ButtonGroup
						inversed
						disabled={isLoading}
						onChange={(index) => {
							setChartType(index === 0 ? 'pace_cadence' : 'heart_rate_tempo');
						}}
						group={[
							{
								id: 'pace_cadence',
								text: { base: 'Pace vs Cad', lg: 'Pace vs Cadence' }
							},
							{
								id: 'heart_rate_tempo',
								text: { base: 'HR vs BPM', lg: 'Heart Rate vs Tempo' }
							}
						]}
					/>
				</Box>
				<LineChart
					data={data as ChartData | undefined}
					isLoading={isLoading}
					chartType={chartType}
				/>
			</Box>
		</W.WorkoutMetricsChartStyled.Container>
	);
};
