import { Chart, useChart } from '@chakra-ui/charts';
import { Box, Spinner, Text } from '@chakra-ui/react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart as RechartsLineChart,
	ReferenceDot,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

import { series, tempData, tempSeries } from './constants';
import type { BaseChartData, ChartSeriesItem, LineChartProps } from './types';

import { theme } from '@/styles';

export const LineChart = ({ data, isLoading, chartType }: LineChartProps) => {
	const chartData = (data?.length === 0 ? tempData(chartType) : data) as unknown as BaseChartData[];
	const chartSeries = (data ? series(chartType) : tempSeries(chartType)) as ChartSeriesItem[];

	const chart = useChart({
		data: chartData,
		series: chartSeries
	});

	if (isLoading) {
		return (
			<Box maxH='sm' height='full' display='flex' justifyContent='center' alignItems='center'>
				<Spinner size='xl' color='teal' marginTop='100px' />
			</Box>
		);
	}

	const primaryKey = chartType === 'pace_cadence' ? 'cadence' : 'heartrate';
	const latest = chart.data.findLast(
		(item) => (item as Record<string, number | null>)[primaryKey] !== null
	);

	return (
		<Chart.Root maxH='sm' chart={chart} overflow='hidden' paddingTop={theme.spacing.lg}>
			<RechartsLineChart data={chart.data}>
				<CartesianGrid stroke={chart.color('border')} vertical={false} />
				<XAxis
					axisLine={false}
					dataKey={chart.key('minute')}
					stroke={chart.color('border')}
					tickLine={false}
					tickFormatter={(value) => `${value}m`}
				/>
				<YAxis axisLine={false} tickLine={false} tickMargin={10} stroke={chart.color('border')} />
				<Tooltip
					animationDuration={100}
					cursor={false}
					contentStyle={{ backgroundColor: 'red' }}
					content={<Chart.Tooltip />}
					labelFormatter={(label) => {
						return (
							<Text color={theme.colors.text.white()}>
								Minute of activity:{' '}
								{label === 'cadence' || label === 'tempo' || label === 'heartrate' ? 0 : label}m
							</Text>
						);
					}}
				/>
				<ReferenceDot
					x={latest?.minute}
					y={(latest as Record<string, number> | undefined)?.[primaryKey]}
					r={6}
					fill={chart.color('teal.solid')}
					stroke={chart.color('bg')}
				/>

				<Legend content={<Chart.Legend />} />

				{chart.series.map((item) => (
					<Line
						key={item.name}
						isAnimationActive={false}
						dataKey={chart.key(item.name)}
						stroke={chart.color(item.color)}
						strokeWidth={2}
						dot={false}
					/>
				))}
			</RechartsLineChart>
		</Chart.Root>
	);
};
