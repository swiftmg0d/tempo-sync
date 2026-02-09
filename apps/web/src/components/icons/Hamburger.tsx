import { theme } from '@/styles';

export const Hamburger = () => {
	return (
		<svg width='25' height='28' viewBox='0 0 25 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M3.25977 19.8333V17.8889H20.7598V19.8333H3.25977ZM3.25977 14.9722V13.0278H20.7598V14.9722H3.25977ZM3.25977 10.1111V8.16666H20.7598V10.1111H3.25977Z'
				fill={theme.colors.text.primary}
			/>
		</svg>
	);
};
