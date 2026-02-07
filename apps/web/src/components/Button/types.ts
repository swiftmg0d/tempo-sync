import type { Spacings } from '@/styles';

export interface ButtonProps {
	children?: React.ReactNode;
	variant?: 'border' | 'transparent';
	active: boolean;
	disabled?: boolean;
	$inversed?: boolean;

	onClick?: () => void;
	style?: {
		width?: string;
		paddingX?: Spacings;
		paddingY?: Spacings;
		height?: string;
	};
}

export interface StyledButtonProps {
	$variant?: 'border' | 'transparent';
	$width?: string;
	$active?: boolean;
	$paddingX?: Spacings;
	$paddingY?: Spacings;
	$disabled?: boolean;
	$height?: string;
	$inversed?: boolean;
}
