import { useMemo } from 'react';

import type { PolylinePreviewProp } from '@/types';
import { normalizePolyline } from '@/utils';

export const PolylinePreview = ({ points, width = 40, height = width }: PolylinePreviewProp) => {
	const pointsString = useMemo(() => {
		if (!points || points.length === 0) return '';
		return normalizePolyline(points, width, height)
			.map((p) => `${p.x},${p.y}`)
			.join(' ');
	}, [points, width, height]);

	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
			<polyline
				points={pointsString}
				fill='none'
				stroke='#0d9488'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
