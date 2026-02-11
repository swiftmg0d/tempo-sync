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
		alto2: `rgba(224, 224, 224, 0.2)`,
		slate: (opacity = 1) => `rgba(96, 125, 139, ${opacity})`
	} as const,
	text: {
		primary: '#333333',
		secondary: baseColors.doveGray,
		alabaster: baseColors.alabaster(),
		teal: baseColors.teal(),
		white: (opacity = 1) => `rgba(30, 30, 30, ${opacity})`
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

// Dark mode

export const darkBaseColors = {
	doveGray: '#A0A0A0',
	blackAlpha2: 'rgba(255,255,255,0.02)',
	alabaster: (opacity = 1) => `rgba(26, 26, 26, ${opacity})`,
	teal: (opacity = 1) => `rgba(0, 179, 179, ${opacity})`
} as const;

export const darkColors = {
	bg: {
		lightPrimary: (opacity = 1) => darkBaseColors.alabaster(opacity),
		lightSecondary: '#1E1E1E',
		doveGray: darkBaseColors.doveGray,
		surfaceSubtle: 'rgba(40, 40, 40, 0.3)',
		blackAlpha2: darkBaseColors.blackAlpha2,
		teal: darkBaseColors.teal(),
		white: (opacity = 1) => `rgba(30, 30, 30, ${opacity})`,
		alto2: `rgba(50, 50, 50, 0.2)`,
		slate: (opacity = 1) => `rgba(140, 160, 170, ${opacity})`
	} as const,
	text: {
		primary: '#E8E8E8',
		secondary: darkBaseColors.doveGray,
		alabaster: darkBaseColors.alabaster(),
		teal: darkBaseColors.teal(),
		white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
	} as const,

	accent: {
		primary: darkBaseColors.teal(),
		teal50: darkBaseColors.teal(0.5)
	} as const,

	border: {
		primaryRgb: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		secondaryRgb: (opacity = 1) => `rgba(0, 179, 179, ${opacity})`
	} as const,

	skeleton: {
		base: '#2D2D2D'
	} as const,

	icon: {
		primary: darkBaseColors.doveGray,
		secondary: darkBaseColors.alabaster()
	} as const
};
