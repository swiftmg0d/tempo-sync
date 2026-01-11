import type { Activity } from '@/types/models';

export type ActivityListProps = {
	onClick?: (index: number) => void;
	isActiveCard?: (index: number) => boolean;
	activities: Activity[];
};
