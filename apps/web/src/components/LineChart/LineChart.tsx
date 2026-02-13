import { Chart, useChart } from '@chakra-ui/charts';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ payload, label, chart }: any) => {
	if (!payload?.length) return null;

	return (
		<Box
			bg={theme.colors.bg.white(0.95)}
			border={`1px solid ${theme.colors.border.primaryRgb(0.1)}`}
			rounded='lg'
			px='2.5'
			py='1.5'
			fontSize='xs'
			shadow='sm'
			minW='8rem'
			backdropFilter='blur(8px)'
		>
			<Text fontWeight='medium' color={theme.colors.text.primary} mb='1'>
				Minute of activity: {label}m
			</Text>
			{payload.map((item: any, index: number) => {
				const config = chart.getSeries(item);
				return (
					<Flex key={index} gap='1.5' align='center'>
						{config?.color && (
							<Box
								w='2'
								h='2'
								rounded='full'
								bg={chart.color(config.color)}
							/>
						)}
						<Text color={theme.colors.text.secondary} flex='1'>
							{config?.label || item.name}
						</Text>
						<Text
							fontFamily='mono'
							fontWeight='medium'
							color={theme.colors.text.primary}
							fontVariantNumeric='tabular-nums'
						>
							{item.value?.toLocaleString()}
						</Text>
					</Flex>
				);
			})}
		</Box>
	);
};

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
		<Chart.Root
			maxH='sm'
			chart={chart}
			overflow='hidden'
			paddingTop={theme.spacing.lg}
			marginLeft='-15px'
		>
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
					content={(props) => <CustomTooltip {...props} chart={chart} />}
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
