import * as B from './BackgroundBlur.styled';
export const BlackgroundBlur = () => {
	return (
		<B.BackgroundBlur.Container>
			<B.BackgroundBlur.BlurPoint
				$color='rgba(0, 128, 128, 0.05)'
				$position={{
					top: '40px',
					left: '40px'
				}}
			/>
			<B.BackgroundBlur.BlurPoint
				$color='rgba(180, 160, 200, 0.1)'
				$position={{
					bottom: '40px',
					right: '40px'
				}}
			/>
		</B.BackgroundBlur.Container>
	);
};
