import { withSkeleton } from '@/utils';
import * as A from './ActivityList.styled';
import { ActivityListSkeleton } from './ActivityList.skeleton';
import { ActivityCard } from '@/components/features/Activity/Card';

import type { ActivityListProps } from './types';

const ActivityListComponent = ({ onClick, isActiveCard, activities }: ActivityListProps) => {
	if (!activities || activities.length === 0) {
		return null;
	}

	return (
		<A.ActivityList.Container as={'ul'}>
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
