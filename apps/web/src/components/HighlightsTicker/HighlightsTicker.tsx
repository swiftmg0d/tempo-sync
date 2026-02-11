import type { ActivityHighlights } from '@tempo-sync/shared/types';

import { HighlightsTicker as S } from './HighlightsTicker.styled';

interface TickerItem {
	label: string;
	value: string;
}

const EFFORT_LABELS: Record<string, string> = {
	'400m': 'BEST 400M',
	'1/2 mile': 'BEST HALF MILE',
	'1k': 'FASTEST KM',
	'1 mile': 'BEST MILE',
	'2 mile': 'BEST 2 MILE',
	'5k': 'BEST 5K',
	'10k': 'BEST 10K'
};

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatSpeed = (metersPerSecond: number): string => {
	if (!metersPerSecond || metersPerSecond <= 0) return '0:00';
	const totalSeconds = Math.round(1000 / metersPerSecond);
	const mins = Math.floor(totalSeconds / 60);
	const secs = totalSeconds % 60;
	return `${mins}:${secs.toString().padStart(2, '0')} /km`;
};

const buildTickerItems = (data: ActivityHighlights): TickerItem[] => {
	const items: TickerItem[] = [];

	for (const effort of data.bestEfforts) {
		const label = EFFORT_LABELS[effort.name] ?? `BEST ${effort.name.toUpperCase()}`;
		items.push({ label, value: formatTime(effort.moving_time) });
	}

	if (data.maxHeartrate) {
		items.push({ label: 'MAX HR', value: `${Math.round(data.maxHeartrate)} BPM` });
	}

	if (data.maxSpeed) {
		items.push({ label: 'TOP PACE', value: formatSpeed(data.maxSpeed) });
	}

	if (data.elevHigh !== null) {
		items.push({ label: 'ELEV HIGH', value: `${Math.round(data.elevHigh)}M` });
	}

	if (data.elevLow !== null) {
		items.push({ label: 'ELEV LOW', value: `${Math.round(data.elevLow)}M` });
	}

	if (data.gear) {
		items.push({ label: 'GEAR', value: data.gear.name });
	}

	return items;
};

interface HighlightsTickerProps {
	data: ActivityHighlights | undefined;
}

export const HighlightsTicker = ({ data }: HighlightsTickerProps) => {
	if (!data) return null;

	const items = buildTickerItems(data);

	if (items.length === 0) return null;

	const duration = Math.max(items.length * 4, 20);

	return (
		<S.Wrapper>
			<S.Track $duration={duration}>
				{[0, 1].map((copy) => (
					<S.ItemGroup key={copy}>
						{items.map((item, i) => (
							<>
								<S.Item key={`${copy}-${item.label}`}>
									<S.Label>{item.label}:</S.Label>
									<S.Value>{item.value}</S.Value>
								</S.Item>
								{i < items.length - 1 && <S.Separator>&middot;</S.Separator>}
							</>
						))}
					</S.ItemGroup>
				))}
			</S.Track>
		</S.Wrapper>
	);
};
