import { theme } from '@/styles';

export const Grid = ({ active }: { active?: boolean }) => {
	const fillColor = active ? theme.colors.icon.secondary : theme.colors.icon.primary;
	return (
		<svg
			style={{ width: 'clamp(16px, 4vw, 18px)', height: 'auto' }}
			viewBox='0 0 18 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M2.25 10.25V4.25H8.25V10.25H2.25ZM2.25 17.75V11.75H8.25V17.75H2.25ZM9.75 10.25V4.25H15.75V10.25H9.75ZM9.75 17.75V11.75H15.75V17.75H9.75ZM3.75 8.75H6.75V5.75H3.75V8.75ZM11.25 8.75H14.25V5.75H11.25V8.75ZM11.25 16.25H14.25V13.25H11.25V16.25ZM3.75 16.25H6.75V13.25H3.75V16.25Z'
				fill={fillColor}
			/>
		</svg>
	);
};
