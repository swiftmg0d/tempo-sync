import { Chart, useChart } from '@chakra-ui/charts';
import { Box, Spinner } from '@chakra-ui/react';
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
			<Box height='200px' display='flex' justifyContent='center' alignItems='center'>
				<Spinner size='xl' color='teal' />
			</Box>
		);
	}

	const primaryKey = chartType === 'pace_cadence' ? 'cadence' : 'heart_rate';
	const latest = chart.data.findLast(
		(item) => (item as Record<string, number | null>)[primaryKey] !== null
	);

	return (
		<Chart.Root maxH='sm' chart={chart} marginLeft='-30px' paddingTop={theme.spacing.lg}>
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
					content={<Chart.Tooltip />}
					labelFormatter={(label) =>
						`Minute of activity: ${typeof label === 'number' && !isNaN(label) ? label : 0}m`
					}
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
