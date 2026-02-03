import { Box } from '@chakra-ui/react/box';

import { GlobalMap } from '../GlobalMap';
import { StatsOverview, StatsOverviewEmpty } from '../StatsOverview';

import { AnalyistGrid } from '@/features/AnalyistGrid';
import { showWhen } from '@/utils';

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
			{activeScreenIndex === 0 && showWhen(!!activityCardId, <AnalyistGrid />)}
			{activeScreenIndex === 1 && <GlobalMap />}
			{showWhen(isStatsOverviewScreenNotEmpty, <StatsOverview />)}
			{showWhen(isStatsOverviewScreenEmpty, <StatsOverviewEmpty />)}

			<Box height='50px' />
		</>
	);
};
