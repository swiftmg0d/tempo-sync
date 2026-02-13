import { polygonToCells } from 'h3-js';

export function fromPolygonToCells(geometry: {
	type: 'Polygon' | 'MultiPolygon';
	coordinates: number[][][] | number[][][][];
}) {
	const ring =
		geometry.type === 'Polygon'
			? (geometry.coordinates[0] as [number, number][])
			: (geometry.coordinates[0][0] as [number, number][]);

	return polygonToCells(ring, 9, true);
}
