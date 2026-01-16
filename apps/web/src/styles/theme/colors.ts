export const baseColors = {
	doveGray: '#666666',
	blackAlpha2: 'rgba(0,0,0,0.02)',
	alabaster: (opacity = 1) => `rgba(249, 249, 249, ${opacity})`,
	teal: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`
} as const;

export const colors = {
	bg: {
		lightPrimary: (opacity = 1) => baseColors.alabaster(opacity),
		lightSecondary: '#F0F0F0',
		doveGray: baseColors.doveGray,
		surfaceSubtle: 'rgba(244, 244, 244, 0.3)',
		blackAlpha2: baseColors.blackAlpha2,
		teal: baseColors.teal(),
		white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		alto2: `rgba(224, 224, 224, 0.2)`
	} as const,
	text: {
		primary: '#333333',
		secondary: baseColors.doveGray,
		alabaster: baseColors.alabaster(),
		teal: baseColors.teal()
	} as const,

	accent: {
		primary: baseColors.teal(),
		teal50: baseColors.teal(0.5)
	} as const,

	border: {
		primaryRgb: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		secondaryRgb: (opacity = 1) => `rgba(0, 126, 128, ${opacity})`
	} as const,

	skeleton: {
		base: '#E5E7EB'
	} as const,

	icon: {
		primary: baseColors.doveGray,
		secondary: baseColors.alabaster()
	} as const
};
