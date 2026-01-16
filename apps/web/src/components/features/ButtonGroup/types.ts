import type { IconName } from '@/components/icons';

export type Group = {
	text?: {
		base: string;
		lg: string;
	};
	iconName?: IconName;
};

export type ButtonGroupProps = {
	group: Group[];
	onChange?: (index: number) => void;
	disabled?: boolean;
};
