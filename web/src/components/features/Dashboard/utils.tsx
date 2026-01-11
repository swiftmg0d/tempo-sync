import { showWhen } from '@/utils';
import { AnalyistGrid } from '../AnalyistGrid';
import { GlobalMap } from '../GlobalMap';
import { InsightSummary, InsightSummaryEmpty } from '../Insight/Summary';

export const showActiveScreen = (
	activeScreenIndex: number,
	activityCardId: number | null,
	isEmpty: boolean | null
) => {
	const activeScreenIndexCheck = (index: number) => activeScreenIndex === index;
	const noSelectedActivityCard = !activityCardId && activeScreenIndexCheck(0);

	const isInsightsScreenEmpty = noSelectedActivityCard && !!isEmpty;
	const isInsightsScreenNotEmpty = noSelectedActivityCard && !isEmpty;

	return (
		<>
			{activeScreenIndex === 0 && showWhen(!!activityCardId, <AnalyistGrid />)}
			{activeScreenIndex === 1 && <GlobalMap />}
			{showWhen(isInsightsScreenNotEmpty, <InsightSummary />)}
			{showWhen(isInsightsScreenEmpty, <InsightSummaryEmpty />)}
		</>
	);
};
