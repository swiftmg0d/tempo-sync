import type { IconName } from '@/components/icons';
import type { CardType } from './types';
import type { MetricCard } from '../Metric/Card/types';
import { metricMap } from './constants';

export const createMetricCard = (type: CardType, value: string) => {
	const mapIcons = {
		pace: 'pace',
		heartRate: 'heart',
		distance: 'distance',
		calories: 'calorieBurn'
	} as const;

	const mapDescriptions = {
		pace: 'Avg. Pace',
		heartRate: 'Avg. HR',
		distance: 'Distance',
		calories: 'Calories'
	};

	const mapUnits = {
		pace: 'KM',
		heartRate: 'bpm',
		distance: 'KM',
		calories: 'kcal'
	};

	return {
		id: crypto.randomUUID(),
		icon: mapIcons[type] satisfies Extract<IconName, 'pace' | 'heart' | 'distance' | 'calorieBurn'>,
		description: mapDescriptions[type],
		metric: {
			value: value,
			unit: mapUnits[type]
		}
	};
};

export const getMetricList = (
	avgPace?: number | null,
	avgHr?: number | null,
	distance?: number | null,
	calories?: number | null
) => {
	return avgPace || avgHr || distance || calories
		? ([avgPace, avgHr, distance, calories].map((value, index) => {
				return createMetricCard(metricMap[index], value?.toString() || '0');
			}) satisfies MetricCard[])
		: null;
};
