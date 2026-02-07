export type ChartType = 'pace_cadence' | 'heart_rate_tempo';

export interface BaseChartData {
	minute: number;
	[key: string]: number;
}

export interface PaceCadenceData {
	cadence: number;
	pace: number;
	minute: number;
}

export interface HeartRateTempoData {
	heart_rate: number;
	tempo: number;
	minute: number;
}

export type ChartData = PaceCadenceData[] | HeartRateTempoData[];

export interface ChartSeriesItem {
	name: string;
	color: string;
	label: string;
}

export interface LineChartProps {
	isLoading?: boolean;
	data?: ChartData;
	chartType: ChartType;
}
