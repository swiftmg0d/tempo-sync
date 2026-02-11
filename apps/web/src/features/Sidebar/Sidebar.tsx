import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/shallow';

import { BrandHeader } from './BrandHeader';
import * as S from './Sidebar.styled';
import { useSidebarDrag } from './useSidebarDrag';

import { AccountInfo } from '@/components/AccountInfo';
import { ActivityList } from '@/components/Activity/List';
import { ActivityListEmptyState } from '@/components/Activity/List/EmptyState/ActivityListEmptyState';
import { ActivityListLoadMore } from '@/components/Activity/List/LoadMore';
import { ActivityListNoMore } from '@/components/Activity/List/NoMore';
import { Avatar } from '@/components/Avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Queries, useActivities } from '@/hooks/quieries';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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

	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
	const { targetRef, y, syncPosition } = useSidebarDrag();

	// Sync motion value when sidebar state changes externally (grab handle click, backdrop tap)
	useEffect(() => {
		if (isMobile) {
			syncPosition();
		}
	}, [sidebarOpen, isMobile, syncPosition]);

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
			fetchNextPage().catch(() => {
				// Placeholder
			});
		}
	}, [inView, fetchNextPage, isFetchingNextPage, isEmpty]);

	return (
		<S.Sidebar.Aside ref={isMobile ? targetRef : undefined} style={isMobile ? { y } : undefined}>
			{/* Header */}
			<S.Sidebar.Section $border='bot' as='header'>
				<DesktopOnly>
					<Padded $side='all' $p='xl'>
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
			<S.Sidebar.Section
				$flex={2}
				$overflow={sidebarOpen ? 'show' : 'hidden'}
				as='main'
				$disabled={!!isEmpty}
			>
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
					<ThemeToggle />
				</S.Footer>
			</S.Sidebar.Section>
		</S.Sidebar.Aside>
	);
};
