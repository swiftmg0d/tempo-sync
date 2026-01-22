import type { Activity } from '@tempo-sync/shared';
import { Layer, Source } from '@vis.gl/react-maplibre';

import { heatmapLayer } from './GlobalMap.const';

export const renderActivitiesByMapType = (mapType: 'normal' | 'heat', activities: Activity[]) => {
	switch (mapType) {
		case 'normal':
			return activities.map((activity) => {
				return (
					<Source
						id={activity.id}
						key={activity.id}
						type='geojson'
						data={{
							type: 'LineString',
							coordinates: activity.polyline ?? []
						}}
					>
						<Layer
							id={activity.id}
							type='line'
							key={activity.id}
							paint={{ 'line-color': '#149a96', 'line-width': 2 }}
						/>
					</Source>
				);
			});
		case 'heat':
			return activities.map((activity) => {
				const sourceId = `heatmap-${activity.id}`;
				return (
					<Source
						id={sourceId}
						key={sourceId}
						type='geojson'
						data={{
							type: 'FeatureCollection',
							features:
								activity.polyline?.map((coords) => ({
									type: 'Feature' as const,
									properties: {},
									geometry: {
										type: 'Point' as const,
										coordinates: coords
									}
								})) ?? []
						}}
					>
						<Layer {...heatmapLayer} id={sourceId} />
					</Source>
				);
			});

		default:
			return null;
	}
};
