import { Spinner } from '@chakra-ui/react';

import { ActivityListSkeleton } from '../ActivityList.skeleton';

import * as A from './ActivityListLoadingMore.styled';

import { theme } from '@/styles';
export const ActivityListLoadMore = () => {
	return (
		<>
			<A.ActivityListLoadingMore.Container>
				<Spinner w='15px' h='15px' color={theme.colors.accent.primary} />
				<A.ActivityListLoadingMore.Text>Loading more activities...</A.ActivityListLoadingMore.Text>
			</A.ActivityListLoadingMore.Container>
			<ActivityListSkeleton length={2} />
		</>
	);
};
