// import type { GeoPoint } from '@/types';
import { formatDistance } from 'date-fns';

export function withSkeleton<T extends object>(
	Component: React.ComponentType<T>,
	SkeletonComponent: React.FC
) {
	return ({ isLoading, ...props }: T & { isLoading: boolean }) => {
		return isLoading ? <SkeletonComponent /> : <Component {...(props as T)} />;
	};
}

export function renderIf<T, F>(condition: boolean, trueComponent: T, falseComponent: F): T | F {
	return condition ? trueComponent : falseComponent;
}

export function showWhen(condition: boolean, component: React.ReactNode) {
	return condition ? component : null;
}

export function normalizePolyline(
	points: [number, number][] | null,
	width: number,
	height: number,
	padding = 10
) {
	if (!points || points.length === 0) return [];

	const lats = points.map((p) => p[0]);
	const lngs = points.map((p) => p[1]);

	const minLat = Math.min(...lats);
	const maxLat = Math.max(...lats);
	const minLng = Math.min(...lngs);
	const maxLng = Math.max(...lngs);

	const latRange = maxLat - minLat || 1;
	const lngRange = maxLng - minLng || 1;

	const scale = Math.min((width - padding * 2) / lngRange, (height - padding * 2) / latRange);

	const xOffset = (width - lngRange * scale) / 2;
	const yOffset = (height - latRange * scale) / 2;

	return points.map(([latitude, longitude]) => ({
		x: xOffset + (longitude - minLng) * scale,
		y: height - (yOffset + (latitude - minLat) * scale)
	}));
}

export function formatDateDistance(date: Date) {
	const distance = formatDistance(date, new Date(), {
		addSuffix: true
	});

	const regex = new RegExp('about |over |almost |less than ', 'g');

	return distance.replace(regex, '');
}

export const pxToRem = (px: number) => `${px / 16}rem` as const;
