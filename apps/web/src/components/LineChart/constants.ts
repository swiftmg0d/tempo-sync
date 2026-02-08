import type { ChartType, PaceCadenceData, HeartRateTempoData } from './types';

export const tempData = (chartType: ChartType): PaceCadenceData[] | HeartRateTempoData[] => {
	if (chartType === 'pace_cadence') {
		return [
			{ cadence: 0, pace: 0, minute: 0 },
			{ cadence: 0, pace: 0, minute: 15 },
			{ cadence: 0, pace: 0, minute: 30 },
			{ cadence: 0, pace: 0, minute: 45 },
			{ cadence: 0, pace: 0, minute: 60 }
		];
	}
	return [
		{ heart_rate: 0, tempo: 0, minute: 0 },
		{ heart_rate: 0, tempo: 0, minute: 15 },
		{ heart_rate: 0, tempo: 0, minute: 30 },
		{ heart_rate: 0, tempo: 0, minute: 45 },
		{ heart_rate: 0, tempo: 0, minute: 60 }
	];
};

export const series = (chartType: ChartType) => {
	if (chartType === 'pace_cadence') {
		return [
			{ name: 'cadence' as const, color: 'teal.solid', label: 'Cadence' },
			{ name: 'pace' as const, color: 'gray.emphasized', label: 'Pace' }
		];
	}
	return [
		{ name: 'heartrate' as const, color: 'teal.solid', label: 'Heart Rate' },
		{ name: 'tempo' as const, color: 'gray.emphasized', label: 'Tempo' }
	];
};

export const tempSeries = (chartType: ChartType) => {
	if (chartType === 'pace_cadence') {
		return [{ name: 'cadence' as const, color: 'gray.emphasized', label: 'Not Available' }];
	}
	return [{ name: 'heart_rate' as const, color: 'gray.emphasized', label: 'Not Available' }];
};
