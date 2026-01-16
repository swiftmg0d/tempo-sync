import type { AppTheme, FontSize, FontWeight, TextColor } from '@/styles';

export type PaddingSide = 'left' | 'right' | 'top' | 'bottom' | 'x' | 'y' | 'all' | 'none';

export type SpacingKey = keyof AppTheme['spacing'];

export type FlexProperties = {
	direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	gap?: keyof AppTheme['spacing'];
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
	justifyContent?: 'space-between' | 'center';
};

export type TextProperties = {
	size?: FontSize;
	weight?: FontWeight;
	color?: TextColor;
};

export type PolymorphicProps<E extends React.ElementType, P> = P &
	Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as'> & {
		as?: E;
	};
