import { Layer, Source } from '@vis.gl/react-maplibre';
import { cellToBoundary } from 'h3-js';

export function cellsToGeoJSON(cells: Set<string>, visited?: Set<string>) {
	return {
		type: 'FeatureCollection' as const,
		features: [...cells].map((cell) => {
			const boundary = cellToBoundary(cell).map(([lat, lng]) => [lng, lat]);
			return {
				type: 'Feature' as const,
				properties: {
					visited: visited ? visited.has(cell) : false
				},
				geometry: {
					type: 'Polygon' as const,
					coordinates: [[...boundary, boundary[0]]]
				}
			};
		})
	};
}

const hexColors = {
	dark: { unvisited: '#17171a', visited: '#4ecdc4', border: '#ffffff' },
	light: { unvisited: '#c0c0c0', visited: '#008080', border: '#000000' }
} as const;

export function HexOverlay({
	mapHexagons,
	cells,
	mode
}: {
	mapHexagons: Set<string>;
	cells: Set<string>;
	mode: 'dark' | 'light';
}) {
	const palette = hexColors[mode];

	return (
		<Source id='hexgrid' type='geojson' data={cellsToGeoJSON(mapHexagons, cells)}>
			<Layer
				id='hex-unvisited'
				type='fill'
				filter={['==', ['get', 'visited'], false]}
				paint={{
					'fill-color': palette.unvisited,
					'fill-opacity': 0.7,
					'fill-opacity-transition': { duration: 400 }
				}}
			/>

			<Layer
				id='hex-visited'
				type='fill'
				filter={['==', ['get', 'visited'], true]}
				paint={{
					'fill-color': palette.visited,
					'fill-opacity': 0.4,
					'fill-opacity-transition': { duration: 400 }
				}}
			/>

			<Layer
				id='hex-border'
				type='line'
				paint={{
					'line-color': palette.border,
					'line-width': 0.3,
					'line-opacity': 0.15,
					'line-opacity-transition': { duration: 400 }
				}}
			/>
		</Source>
	);
}
