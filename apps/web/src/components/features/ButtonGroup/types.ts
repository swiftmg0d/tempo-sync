import type { IconName } from '@/components/icons';

export interface Group {
	id: string;
	text?: {
		base: string;
		lg: string;
	};
	iconName?: IconName;
}

export interface ButtonGroupProps {
	group: Group[];
	onChange?: (index: number) => void;
	disabled?: boolean;
}
