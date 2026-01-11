import * as S from './Sidebar.styled';
import { Padded } from '@/styles/patterns';

import { Avatar } from '@/components/ui/Avatar';
import { AccountInfo } from '../AccountInfo';
import { ActivityList } from '../Activity';
import { BrandHeader } from './BrandHeader';
import { useCurrentAthlete } from '@/hooks/quieries/useCurrentAthlete';

import { useActivityCardsStore } from '@/state';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import { showWhen } from '@/utils';
import { ActivityListEmptyState } from '../Activity/List/EmptyState/ActivityListEmptyState';
import { useInView } from 'react-intersection-observer';
import { ActivityListLoadMore } from '../Activity/List/LoadMore';
import { ActivityListNoMore } from '../Activity/List/NoMore';
import { useActivities } from '@/hooks/quieries';

export const Sidebar = () => {
	const { activeCardId, setActiveCardId, setIsEmpty, isEmpty } = useActivityCardsStore(
		useShallow((state) => ({
			activeCardId: state.activeCardId,
			setActiveCardId: state.setActiveCardId,
			setIsEmpty: state.setIsEmpty,
			isEmpty: state.isEmpty
		}))
	);

	const { data, isLoading: isCurrentAthleteLoading } = useCurrentAthlete();

	const {
		data: infiniteActivities,
		fetchNextPage,
		isLoading: isActivitiesLoading,
		isFetchingNextPage
	} = useActivities();

	const activities = infiniteActivities?.pages.flatMap((page) => page.data.activities);

	const hasMore =
		infiniteActivities?.pages[infiniteActivities.pages.length - 1].data.pagination.nextPage !==
		null;

	useEffect(() => {
		console.log((!activities || activities.length === 0) && !isActivitiesLoading);
		if ((!activities || activities.length === 0) && !isActivitiesLoading) {
			setIsEmpty(true);
			return;
		}
	}, [activities, setIsEmpty, isActivitiesLoading]);

	const name = !data ? undefined : data.firstName + ' ' + data.lastName;

	const { ref, inView } = useInView({
		threshold: 1
	});

	useEffect(() => {
		if (inView && !isFetchingNextPage && !isEmpty) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, isFetchingNextPage, isEmpty]);

	return (
		<S.Sidebar.Aside>
			{/* Header */}
			<S.Sidebar.Section $border='bot' as={'header'}>
				<Padded $side='all' $p='xxl'>
					<BrandHeader />
				</Padded>
			</S.Sidebar.Section>

			{/* Content */}
			<S.Sidebar.Section $flex={2} $overflow='show' as={'main'} $disabled={!!isEmpty}>
				<ActivityList
					isLoading={isActivitiesLoading}
					isActiveCard={(index) => index === activeCardId}
					onClick={(index) => {
						if (index === activeCardId) {
							setActiveCardId(null);
							return;
						}
						setActiveCardId(index);
					}}
					activities={activities!}
				/>

				{showWhen(isFetchingNextPage && !isEmpty, <ActivityListLoadMore />)}
				{showWhen(!isActivitiesLoading, <div ref={ref}></div>)}
				{showWhen(!!isEmpty, <ActivityListEmptyState />)}
				{showWhen(!hasMore && !isActivitiesLoading, <ActivityListNoMore />)}
			</S.Sidebar.Section>

			{/* Footer */}
			<S.Sidebar.Section $border='top' as={'footer'} $varient='footer'>
				<S.Footer>
					<Avatar
						isLoading={isCurrentAthleteLoading}
						fallbackName={name || 'Athlete Name'}
						image={data?.profilePhoto!}
					/>
					<AccountInfo
						isLoading={isCurrentAthleteLoading}
						header={name || 'Athlete Name'}
						subHeader='Software Engineer'
					/>
				</S.Footer>
			</S.Sidebar.Section>
		</S.Sidebar.Aside>
	);
};
