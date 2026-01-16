import type { Activity } from '@tempo-sync/shared/types';

export interface ActivityCardProps extends Activity {
	onClick?: () => void;
	active: boolean;
}
