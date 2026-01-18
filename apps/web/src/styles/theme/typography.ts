import { pxToRem } from '@/utils';

export const typography = {
	fonts: {
		sans: "'Source Sans 3 Variable', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" as const
	},

	fontSizes: {
		xxs: pxToRem(10),
		xs: pxToRem(12),
		sm: pxToRem(14),
		md: pxToRem(16),
		lg: pxToRem(18),
		xl: pxToRem(20),
		xxl: pxToRem(24),
		'3xl': pxToRem(30),
		'4xl': pxToRem(36),
		'5xl': pxToRem(48)
	} as const,
	fontWeights: {
		regular: 400,
		medium: 500,
		semibold: 600,
		bold: 700
	} as const
};
