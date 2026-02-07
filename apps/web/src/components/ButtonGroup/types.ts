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
	inversed?: boolean;
	group: Group[];
	onChange?: (index: number) => void;
	disabled?: boolean;
}
