import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { layout } from './layout';
import { shadows } from './shadows';
import { typography } from './typography';

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface Theme extends AppTheme {}
}

export const theme = {
	colors: { ...colors },
	shadows: { ...shadows },
	spacing: { ...layout.spacing },
	radii: { ...layout.radii },
	fonts: { ...typography.fonts },
	fontSizes: { ...typography.fontSizes },
	fontWeights: { ...typography.fontWeights },
	breakpoints: { ...breakpoints }
} as const;

export type AppTheme = typeof theme;

export type Spacings = keyof typeof theme.spacing;

export type Colors = keyof typeof theme.colors.bg;

export type FontWeight = keyof typeof theme.fontWeights;

export type FontSize = keyof typeof theme.fontSizes;

export type TextColor = keyof typeof theme.colors.text;
