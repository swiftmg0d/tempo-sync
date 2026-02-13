import { Box } from '@chakra-ui/react';
import { Map, type MapRef, NavigationControl, ScaleControl } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { latLngToCell } from 'h3-js';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { HexOverlay } from './GlobalMap.lib';
import { MapContainer } from './GlobalMap.styled';
import { renderActivitiesByMapType } from './GlobalMap.utils';
import { MapTypeControl } from './GlobalMapControls';
import { GlobalMapLoading } from './GlobalMapLoading';

import { DiscoveryStats } from '@/components/DiscoveryStats';
import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore, useThemeStore } from '@/store';

const mapKey = import.meta.env.VITE_MAP_KEY;

export const GlobalMap = () => {
	const [isMapLoading, setIsMapLoading] = useState(true);
	const [mapType, setMapType] = useState<'heat' | 'normal'>('normal');
	const [isHexOverlay, setIsHexOverlay] = useState(false);
	const mapRef = useRef<MapRef>(null);

	const activityId = useActivityCardsStore((state) => state.activityId);
	const themeMode = useThemeStore((state) => state.mode);

	const { data, isLoading } = Queries.useActivities();
	const { data: mapHexagons, isLoading: isMapHexagonsLoading } = Queries.useMapHexagons()({
		enabled: isHexOverlay
	});

	const mapVariant = themeMode === 'dark' ? 'dataviz-v4-dark' : 'dataviz-v4-light';

	const activities = data?.pages.flatMap((page) => page.data.activities);
	const activitiesFiltered = activities?.filter((activity) => activity.id === activityId);
	const dataToShow = activityId ? activitiesFiltered : activities;

	const allCoordinates = isHexOverlay
		? dataToShow?.flatMap((activity) => activity.polyline ?? [])
		: undefined;
	const cells =
		isHexOverlay && allCoordinates
			? new Set(allCoordinates.map((coord) => latLngToCell(coord[1], coord[0], 9)))
			: undefined;

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
		<MapContainer>
			<Map
				ref={mapRef}
				initialViewState={{
					longitude: 10,
					latitude: 54,
					zoom: 2
				}}
				mapStyle={`https://api.maptiler.com/maps/${mapVariant}/style.json?key=${mapKey}`}
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
					showHex={isHexOverlay}
					onHeatToggle={setMapType}
					onHexToggle={setIsHexOverlay}
				/>
				{renderActivitiesByMapType(mapType, dataToShow ?? [])}

				{isMapHexagonsLoading ? (
					<Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
						<GlobalMapLoading.LoadingCircle />
					</Box>
				) : null}

				{isHexOverlay && !!mapHexagons && !!cells ? (
					<>
						<AnimatePresence>
							<DiscoveryStats
								isEmpty={cells.size === 0 || mapHexagons.size === 0}
								value={(cells.size / mapHexagons.size) * 100}
							/>
						</AnimatePresence>
						<HexOverlay mapHexagons={mapHexagons} cells={cells} mode={themeMode} />
					</>
				) : null}
			</Map>

			{isMapLoading || isLoading ? <GlobalMapLoading /> : null}
		</MapContainer>
	);
};
