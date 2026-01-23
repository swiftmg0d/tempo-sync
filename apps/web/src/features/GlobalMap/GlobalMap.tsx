import { Map, type MapRef, NavigationControl, ScaleControl } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';

import { renderActivitiesByMapType } from './GlobalMap.utils';
import { MapTypeControl } from './GlobalMapControls';
import { GlobalMapLoading } from './GlobalMapLoading';

import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';

export const GlobalMap = () => {
	const [isMapLoading, setIsMapLoading] = useState(true);
	const [mapType, setMapType] = useState<'heat' | 'normal'>('normal');

	const activityId = useActivityCardsStore((state) => state.activityId);

	const { data, isLoading } = Queries.useActivities();
	const activities = data?.pages.flatMap((page) => page.data.activities);

	const activitiesFiltered = activities?.filter((activity) => activity.id === activityId);

	const dataToShow = activityId ? activitiesFiltered : activities;

	const mapRef = useRef<MapRef>(null);

	useEffect(() => {
		if (dataToShow && mapRef.current && !isMapLoading) {
			const map = mapRef.current.getMap();
			const allCoordinates = dataToShow.flatMap((activity) => activity.polyline ?? []);
			if (allCoordinates.length === 0) {
				return;
			}
			const lons = allCoordinates.map((coord) => coord[0]);
			const lats = allCoordinates.map((coord) => coord[1]);

			map.flyTo({
				center: [
					lons.reduce((a, b) => a + b, 0) / lons.length,
					lats.reduce((a, b) => a + b, 0) / lats.length
				],

				zoom: 12,
				speed: 0.6
			});
		}
	}, [dataToShow, isMapLoading]);

	return (
		<>
			<Map
				ref={mapRef}
				initialViewState={{
					longitude: 10,
					latitude: 54,
					zoom: 2
				}}
				mapStyle='https://api.maptiler.com/maps/dataviz-v4-light/style.json?key=fMnEWFD9MB3WFE48MIIx'
				onLoad={() => {
					setIsMapLoading(false);
				}}
				maxTileCacheSize={100}
				refreshExpiredTiles={false}
				trackResize={false}
				fadeDuration={0}
				scrollZoom
				dragRotate={false}
				maxPitch={0}
				pitchWithRotate={false}
			>
				<NavigationControl position='top-right' />
				<ScaleControl position='bottom-left' />
				<MapTypeControl
					type={mapType}
					onChange={(type) => {
						setMapType(type);
					}}
				/>
				{renderActivitiesByMapType(mapType, dataToShow ?? [])}
			</Map>

			{isMapLoading || isLoading ? <GlobalMapLoading /> : null}
		</>
	);
};
