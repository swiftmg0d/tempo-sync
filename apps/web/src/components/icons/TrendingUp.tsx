import { StyledSvg } from './Svg.styled';

export const TrendingUp = ({ active }: { active: boolean }) => {
	const fillColor = active ? '#666666' : 'transparent';
	return (
		<StyledSvg
			$width='clamp(11px, 4vw, 13px)'
			viewBox='0 0 13 14'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1.82942 9.91675L1.14886 9.23619L4.74609 5.61466L6.69053 7.55911L9.21831 5.05564H7.95442V4.08341H10.8711V7.00008H9.89886V5.73619L6.69053 8.94453L4.74609 7.00008L1.82942 9.91675Z'
				fill={fillColor}
			/>
		</StyledSvg>
	);
};
