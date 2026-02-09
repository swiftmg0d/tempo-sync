import { breakpoints } from './breakpoints';
import { colors, darkColors } from './colors';
import { layout } from './layout';
import { darkShadows, shadows } from './shadows';
import { typography } from './typography';

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface Theme extends AppTheme {}
}

const shared = {
	spacing: { ...layout.spacing },
	radii: { ...layout.radii },
	fonts: { ...typography.fonts },
	fontSizes: { ...typography.fontSizes },
	fontWeights: { ...typography.fontWeights },
	breakpoints: { ...breakpoints }
} as const;

export const lightTheme = {
	mode: 'light' as const,
	colors: { ...colors },
	shadows: { ...shadows },
	...shared
} as const;

export const darkTheme = {
	mode: 'dark' as const,
	colors: { ...darkColors },
	shadows: { ...darkShadows },
	...shared
} as const;

export let theme: AppTheme = lightTheme;

export const setActiveTheme = (mode: 'light' | 'dark') => {
	theme = (mode === 'light' ? lightTheme : darkTheme) as AppTheme;
};

export type AppTheme = Omit<typeof lightTheme, 'mode'> & { mode: 'light' | 'dark' };

export type Spacings = keyof typeof lightTheme.spacing;

export type Colors = keyof typeof lightTheme.colors.bg;

export type FontWeight = keyof typeof lightTheme.fontWeights;

export type FontSize = keyof typeof lightTheme.fontSizes;

export type TextColor = keyof typeof lightTheme.colors.text;
