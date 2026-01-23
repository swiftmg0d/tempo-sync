import { ActivityCard } from '../Card';

import { ActivityListSkeleton } from './ActivityList.skeleton';
import * as A from './ActivityList.styled';
import type { ActivityListProps } from './types';

import { withSkeleton } from '@/utils';

const ActivityListComponent = ({ onClick, isActiveCard, activities }: ActivityListProps) => {
	if (activities.length === 0) {
		return null;
	}

	return (
		<A.ActivityList.Container as='ul'>
			{activities.map((activity) => (
				<ActivityCard
					key={activity.id}
					active={isActiveCard ? isActiveCard(activity.id) : false}
					onClick={() => onClick?.(activity.id)}
					{...activity}
				/>
			))}
		</A.ActivityList.Container>
	);
};

export const ActivityList = withSkeleton(ActivityListComponent, ActivityListSkeleton);
