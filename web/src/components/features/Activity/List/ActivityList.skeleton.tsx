import { ActivityCardSkeleton } from '../Card/ActivityCard.skeleton';
import * as A from './ActivityList.styled';
export const ActivityListSkeleton = ({ length = 3 }) => {
	return (
		<A.ActivityList.Container as={'ul'}>
			{Array.from({ length }).map((_, index) => (
				<ActivityCardSkeleton key={index} />
			))}
		</A.ActivityList.Container>
	);
};
