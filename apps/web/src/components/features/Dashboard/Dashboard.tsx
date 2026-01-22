import { DashboardHeader } from './Header/DashboardHeader';
import { showActiveScreen } from './utils';

import { BlackgroundBlur } from '@/components/frame/Background/Blur';
import { useActiveScreenStore, useActivityCardsStore } from '@/store';

export const Dashboard = () => {
	const activeScreenIndex = useActiveScreenStore((state) => state.activeScreenIndex);
	const activityCardId = useActivityCardsStore((state) => state.activityId);
	const isEmpty = useActivityCardsStore((state) => state.isEmpty);

	return (
		<>
			<DashboardHeader />
			<BlackgroundBlur />
			{showActiveScreen(activeScreenIndex, activityCardId, isEmpty)}
		</>
	);
};
