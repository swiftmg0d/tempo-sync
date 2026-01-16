import type { Activity } from '@tempo-sync/shared/types';

export type ActivityListProps = {
	onClick?: (index: string) => void;
	isActiveCard?: (index: string) => boolean;
	activities: Activity[];
};
