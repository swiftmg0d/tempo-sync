import type { Activity } from '@tempo-sync/shared/types';

export interface ActivityListProps {
	onClick?: (activityId: string) => void;
	isActiveCard?: (index: string) => boolean;
	activities: Activity[];
}
