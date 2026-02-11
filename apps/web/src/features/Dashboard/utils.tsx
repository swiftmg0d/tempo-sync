import { Box } from '@chakra-ui/react/box';
import { lazy, Suspense } from 'react';

import { StatsOverview, StatsOverviewEmpty } from '../StatsOverview';

import { MobileOnly } from '@/styles';
import { showWhen } from '@/utils';

const GlobalMap = lazy(() =>
	import('../GlobalMap/GlobalMap').then((m) => ({ default: m.GlobalMap }))
);
const AnalyistGrid = lazy(() =>
	import('@/features/AnalyistGrid/AnalyistGrid').then((m) => ({ default: m.AnalyistGrid }))
);

export const showActiveScreen = (
	activeScreenIndex: number,
	activityCardId: string | null,
	isEmpty: boolean | null
) => {
	const activeScreenIndexCheck = (index: number) => activeScreenIndex === index;
	const noSelectedActivityCard = !activityCardId && activeScreenIndexCheck(0);

	const isStatsOverviewScreenEmpty = noSelectedActivityCard && !!isEmpty;
	const isStatsOverviewScreenNotEmpty = noSelectedActivityCard && !isEmpty;

	return (
		<>
			{activeScreenIndex === 0 &&
				showWhen(
					!!activityCardId,
					<Suspense>
						<AnalyistGrid />
					</Suspense>
				)}
			{activeScreenIndex === 1 && (
				<Suspense>
					<GlobalMap />
				</Suspense>
			)}
			{showWhen(isStatsOverviewScreenNotEmpty, <StatsOverview />)}
			{showWhen(isStatsOverviewScreenEmpty, <StatsOverviewEmpty />)}

			<MobileOnly>
				<Box height='50px' />
			</MobileOnly>
		</>
	);
};
