import type { LayerProps } from '@vis.gl/react-maplibre';

export const heatmapLayer: LayerProps = {
	id: 'heatmap',
	type: 'heatmap',
	source: 'points',
	paint: {
		'heatmap-weight': 1,

		'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 12, 3, 15, 4],

		'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 4, 9, 12, 15, 20],

		'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.85, 15, 0.6],

		'heatmap-color': [
			'interpolate',
			['linear'],
			['heatmap-density'],
			0,
			'rgba(0, 0, 0, 0)',
			0.15,
			'#E0F7FA',
			0.3,
			'#80DEEA',
			0.45,
			'#26C6DA',
			0.6,
			'#00ACC1',
			0.8,
			'#00838F',
			1,
			'#006064'
		]
	}
} as const;
