import styled from '@emotion/styled';

const Container = styled.div`
	position: absolute;
	inset: 0;
	overflow: hidden;
	pointer-events: none;
	z-index: -1;
`;
export const BlurPoint = styled.div<{
	$color?: string;
	$position?: Partial<Record<'top' | 'bottom' | 'left' | 'right', string>>;
}>`
	position: absolute;

	bottom: 40px;
	right: 40px;

	${({ $position }) =>
		$position &&
		Object.entries($position)
			.map(([key, value]) => `${key}: ${value};`)
			.join(' ')}

	width: 384px;
	height: 384px;
	background-color: ${({ $color }) => $color || 'transparent'};
	border-radius: 9999px;
	filter: blur(100px);

	@media (min-width: 1024px) {
		${({ $position }) =>
			$position &&
			Object.entries($position)
				.map(([key]) => `${key}: 25%;`)
				.join(' ')}
	}
`;

export const BackgroundBlur = {
	Container,
	BlurPoint
};
