import { baseColors } from './colors';

export const shadows = {
	container: {
		activeGlow: `0 0 10px ${baseColors.teal(0.3)}`
	} as const,
	button: {
		activeGlow: `0 0 15px ${baseColors.teal(0.2)}`
	} as const,
	lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' as const,
	sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)' as const,
	upwards: '0 -4px 20px rgba(0, 0, 0, 0.1)' as const
};
