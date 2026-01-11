import type { Spacings } from '@/styles';

export type ButtonProps = {
	children?: React.ReactNode;
	variant?: 'border' | 'transparent';
	active: boolean;
	disabled?: boolean;

	onClick?: () => void;
	style?: {
		width?: string;
		paddingX?: Spacings;
		paddingY?: Spacings;
		height?: string;
	};
};

export type StyledButtonProps = {
	$variant?: 'border' | 'transparent';
	$width?: string;
	$active?: boolean;
	$paddingX?: Spacings;
	$paddingY?: Spacings;
	$disabled?: boolean;
	$height?: string;
};
