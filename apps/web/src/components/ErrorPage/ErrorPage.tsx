import { Box, Button } from '@chakra-ui/react';

import * as E from './ErrorPage.styled';

import { theme } from '@/styles';

export const ErrorPage = () => {
	return (
		<E.ErrorPage.Container>
			<Box display='flex' marginBottom='1rem' justifyContent='center' alignItems='center'>
				<svg
					viewBox='0 0 400 150'
					xmlns='http://www.w3.org/2000/svg'
					style={{ width: '70%', height: '70%' }}
				>
					<path
						d='M0 75 L 80 75 L 90 40 L 110 110 L 120 75 L 180 75'
						fill='none'
						opacity='0.3'
						stroke='#B0B0D0'
						strokeWidth='2'
					/>
					<g className='waveform-path'>
						<path
							d='M190 75 L 220 75 L 235 20 L 255 130 L 270 75'
							fill='none'
							stroke='#008080'
							strokeLinecap='round'
							strokeWidth='4'
						/>
						<circle cx='285' cy='75' fill='#008080' r='4' />
						<path
							d='M305 75 L 340 75 L 350 50 L 365 100 L 380 75 L 400 75'
							fill='none'
							stroke='#B0B0D0'
							strokeLinecap='round'
							strokeWidth='3'
						/>
					</g>
					<rect fill='#008080' height='2' opacity='0.4' width='8' x='275' y='60' />
					<rect fill='#B0B0D0' height='2' opacity='0.6' width='5' x='285' y='85' />
				</svg>
			</Box>
			<E.ErrorPage.Header>Rhythm Out of Sync</E.ErrorPage.Header>
			<E.ErrorPage.Description>
				We encountered an unexpected beat. Our systems are working to restore the perfect harmony
				for your performance data.
			</E.ErrorPage.Description>
			<Box display='flex' justifyContent='center' marginTop='1rem'>
				<Button
					onClick={() => {
						window.location.reload();
					}}
					backgroundColor='transparent'
					color={theme.colors.text.primary}
					border={`1px solid ${theme.colors.border.primaryRgb(0.3)}`}
					borderRadius={theme.radii.lg}
				>
					Return to dashboard
				</Button>
			</Box>
		</E.ErrorPage.Container>
	);
};
