import { useId } from 'react';

import { theme } from '@/styles';

export const Logo = () => {
	const uniqueId = useId();
	const gradientId = `logo_border_gradient_${uniqueId}`;
	const isDark = theme.mode === 'dark';

	return (
		<svg
			style={{ width: 'clamp(24px, 4vw, 36px)', height: 'auto', display: 'block' }}
			viewBox='0 0 36 36'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect
				width='36'
				height='36'
				rx='22%'
				fill={`url(#${gradientId})`}
				shapeRendering='geometricPrecision'
			/>

			<rect x='2' y='2' width='32' height='32' rx='6' fill={isDark ? '#1E1E1E' : '#F9F9F9'} />

			<path
				d='M13.8333 22.1667H15.5V18H13.8333V22.1667ZM20.5 22.1667H22.1667V13.8333H20.5V22.1667ZM17.1667 22.1667H18.8333V19.6667H17.1667V22.1667ZM17.1667 18H18.8333V16.3333H17.1667V18ZM12.1667 25.5C11.7083 25.5 11.316 25.3368 10.9896 25.0104C10.6632 24.684 10.5 24.2917 10.5 23.8333V12.1667C10.5 11.7083 10.6632 11.316 10.9896 10.9896C11.316 10.6632 11.7083 10.5 12.1667 10.5H23.8333C24.2917 10.5 24.684 10.6632 25.0104 10.9896C25.3368 11.316 25.5 11.7083 25.5 12.1667V23.8333C25.5 24.2917 25.3368 24.684 25.0104 25.0104C24.684 25.3368 24.2917 25.5 23.8333 25.5H12.1667ZM12.1667 23.8333H23.8333V12.1667H12.1667V23.8333Z'
				fill='#008080'
			/>

			<defs>
				<linearGradient
					id={gradientId}
					x1='0'
					y1='0'
					x2='1'
					y2='1'
					gradientUnits='objectBoundingBox'
				>
					<stop stopColor='#008080' />
					<stop offset='1' stopColor={isDark ? '#E8E8E8' : '#333333'} />
				</linearGradient>
			</defs>
		</svg>
	);
};
