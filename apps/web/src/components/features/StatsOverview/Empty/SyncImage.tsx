import { Box } from '@chakra-ui/react';

export const SyncImage = () => {
	return (
		<Box width='320px' height='128px' display='flex' justifyContent='center' alignItems='center'>
			<svg fill='none' viewBox='0 0 320 100' xmlns='http://www.w3.org/2000/svg'>
				<path d='M75 50 L135 50' stroke='#E0E0E0' strokeDasharray='4 4' strokeWidth='2' />
				<path d='M245 50 L185 50' stroke='#E0E0E0' strokeDasharray='4 4' strokeWidth='2' />
				<circle fill='#FC4C02' r='3'>
					<animateMotion dur='2s' path='M75 50 L135 50' repeatCount='indefinite' />
					<animate attributeName='opacity' dur='2s' repeatCount='indefinite' values='0;1;1;0' />
				</circle>
				<circle fill='#1DB954' r='3'>
					<animateMotion dur='2s' path='M245 50 L185 50' repeatCount='indefinite' />
					<animate attributeName='opacity' dur='2s' repeatCount='indefinite' values='0;1;1;0' />
				</circle>
				<g>
					<circle cx='50' cy='50' fill='white' r='24' stroke='#F0F0F0' strokeWidth='1' />
					<path d='M44 58 L50 42 L56 58 h-3 L50 50 L47 58 Z' fill='#FC4C02' />
					<circle cx='50' cy='50' opacity='0.2' r='24' stroke='#FC4C02' strokeWidth='1'>
						<animate attributeName='r' dur='3s' repeatCount='indefinite' values='24;30' />
						<animate attributeName='opacity' dur='3s' repeatCount='indefinite' values='0.3;0' />
					</circle>
				</g>
				<g>
					<circle cx='270' cy='50' fill='white' r='24' stroke='#F0F0F0' strokeWidth='1' />
					<path
						d='M263 52 Q270 47 277 52 M261 56 Q270 50 279 56 M265 48 Q270 45 275 48'
						fill='none'
						stroke='#1DB954'
						strokeLinecap='round'
						strokeWidth='2'
					/>
					<circle cx='270' cy='50' opacity='0.2' r='24' stroke='#1DB954' strokeWidth='1'>
						<animate
							attributeName='r'
							begin='1s'
							dur='3s'
							repeatCount='indefinite'
							values='24;30'
						/>
						<animate
							attributeName='opacity'
							begin='1s'
							dur='3s'
							repeatCount='indefinite'
							values='0.3;0'
						/>
					</circle>
				</g>
				<g>
					<rect
						fill='white'
						height='50'
						rx='14'
						stroke='#008080'
						strokeWidth='2'
						width='50'
						x='135'
						y='25'
					/>
					<path
						d='M145 42 h30 M145 50 h30 M145 58 h30'
						opacity='0.2'
						stroke='#008080'
						strokeLinecap='round'
						strokeWidth='2'
					/>
					<path d='M152 42 h16' stroke='#008080' strokeLinecap='round' strokeWidth='2' />
					<path d='M148 50 h24' stroke='#008080' strokeLinecap='round' strokeWidth='2' />
					<path d='M150 58 h20' stroke='#008080' strokeLinecap='round' strokeWidth='2' />
					<circle cx='178' cy='30' fill='#10B981' r='8' stroke='white' strokeWidth='2' />
					<path
						d='M175 30 l2 2 l4 -4'
						stroke='white'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='1.5'
					/>
				</g>
			</svg>
		</Box>
	);
};
