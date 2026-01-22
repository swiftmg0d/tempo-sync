import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/shallow';

import { AccountInfo } from '../AccountInfo';
import { ActivityList } from '../Activity';
import { ActivityListEmptyState } from '../Activity/List/EmptyState/ActivityListEmptyState';
import { ActivityListLoadMore } from '../Activity/List/LoadMore';
import { ActivityListNoMore } from '../Activity/List/NoMore';

import { BrandHeader } from './BrandHeader';
import * as S from './Sidebar.styled';

import { Avatar } from '@/components/ui/Avatar';
import { Queries, useActivities } from '@/hooks/quieries';
import { useActivityCardsStore, useUIStore } from '@/store';
import { theme } from '@/styles';
import { DesktopOnly, MobileOnly, Padded } from '@/styles/patterns';
import { showWhen } from '@/utils';

export const Sidebar = () => {
	const { activityId, setActiveCardId, setIsEmpty, isEmpty } = useActivityCardsStore(
		useShallow((state) => ({
			activityId: state.activityId,
			setActiveCardId: state.setActiveCardId,
			setIsEmpty: state.setIsEmpty,
			isEmpty: state.isEmpty
		}))
	);

	const { toggleSidebar, sidebarOpen } = useUIStore(
		useShallow((state) => ({
			toggleSidebar: state.toggleSidebar,
			sidebarOpen: state.isSidebarOpen
		}))
	);
	const { data, isLoading: isCurrentAthleteLoading } = Queries.useCurrentAthlete();

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
			void fetchNextPage();
		}
	}, [inView, fetchNextPage, isFetchingNextPage, isEmpty]);

	return (
		<S.Sidebar.Aside $isOpen={sidebarOpen}>
			{/* Header */}
			<S.Sidebar.Section $border='bot' as='header'>
				<DesktopOnly>
					<Padded $side='all' $p='xxl'>
						<BrandHeader />
					</Padded>
				</DesktopOnly>

				<MobileOnly>
					<Box display='flex' justifyContent='center'>
						<Box
							width='48px'
							height='6px'
							backgroundColor={theme.colors.bg.doveGray}
							borderRadius={theme.radii.md}
							onClick={toggleSidebar}
						/>
					</Box>
					<Text fontWeight={theme.fontWeights.bold} textAlign='center' paddingTop={theme.spacing.s}>
						Recent Analyses
					</Text>
				</MobileOnly>
			</S.Sidebar.Section>

			{/* Content */}
			<S.Sidebar.Section $flex={2} $overflow='show' as='main' $disabled={!!isEmpty}>
				<ActivityList
					isLoading={isActivitiesLoading}
					isActiveCard={(id) => id === activityId}
					onClick={(id) => {
						if (activityId === id) {
							setActiveCardId(null);
							return;
						}
						setActiveCardId(id);
					}}
					activities={activities ?? []}
				/>

				{showWhen(isFetchingNextPage && !isEmpty, <ActivityListLoadMore />)}
				{showWhen(!isActivitiesLoading, <div ref={ref} />)}
				{showWhen(!!isEmpty, <ActivityListEmptyState />)}
				{showWhen(!hasMore && !isActivitiesLoading, <ActivityListNoMore />)}
			</S.Sidebar.Section>

			{/* Footer */}
			<S.Sidebar.Section $border='top' as='footer' $varient='footer'>
				<S.Footer>
					<Avatar
						isLoading={isCurrentAthleteLoading}
						fallbackName={name ?? 'Athlete Name'}
						image={data?.profilePhoto ?? ''}
					/>
					<AccountInfo
						isLoading={isCurrentAthleteLoading}
						header={name ?? 'Athlete Name'}
						subHeader='Software Engineer'
					/>
				</S.Footer>
			</S.Sidebar.Section>
		</S.Sidebar.Aside>
	);
};
