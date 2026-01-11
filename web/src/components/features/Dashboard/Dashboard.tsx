import { DashboardHeader } from './Header/DashboardHeader';
import { useActiveScreenState, useActivityCardsStore } from '@/state';
import { showActiveScreen } from './utils';
import { BlackgroundBlur } from '@/components/frame/Background/Blur';

export const Dashboard = () => {
	const activeScreenIndex = useActiveScreenState((state) => state.activeScreenIndex);
	const activityCardId = useActivityCardsStore((state) => state.activeCardId);
	const isEmpty = useActivityCardsStore((state) => state.isEmpty);

	return (
		<>
			<DashboardHeader />
			<BlackgroundBlur />
			{showActiveScreen(activeScreenIndex, activityCardId, isEmpty)}
		</>
	);
};
