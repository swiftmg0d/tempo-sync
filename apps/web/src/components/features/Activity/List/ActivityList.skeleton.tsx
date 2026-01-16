import { ActivityCardSkeleton } from '../Card/ActivityCard.skeleton';

import * as A from './ActivityList.styled';
export const ActivityListSkeleton = ({ length = 3 }) => {
	return (
		<A.ActivityList.Container as='ul'>
			{Array.from({ length }).map((_, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<ActivityCardSkeleton key={index} />
			))}
		</A.ActivityList.Container>
	);
};
