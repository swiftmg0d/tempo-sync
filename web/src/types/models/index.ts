import type { IconName } from '@/components/icons';

export interface Pagination {
	page: number;
	limit: number;
	total: number;
	hasNext: boolean;
	nextPage: number | null;
}

export interface Athlete {
	firstName: string;
	lastName: string;
	profilePhoto: string;
}

export interface Activity {
	id: number;
	title: string;
	date: Date;
	polyline: [number, number][];
	time: number;
}

export interface ActivitySummary {
	id: number;
	title: string;
	avgPace: number;
	avgHr: number;
	distance: number;
	calories: number;
}

export interface ActivitySummaryStats {
	id: `${string}-${string}-${string}-${string}-${string}`;
	icon: IconName;
	title: string;
	value: string;
	info: string;
	label?: string;
}
