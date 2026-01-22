import { Box, IconButton } from '@chakra-ui/react';
import { Flame, LineSquiggle } from 'lucide-react';

import { theme } from '@/styles';

export const MapTypeControl = ({
	onChange,
	type
}: {
	type: 'normal' | 'heat';
	onChange: (mapType: 'normal' | 'heat') => void;
}) => {
	const Icon =
		type === 'normal' ? (
			<Flame color='currentColor' size={16} />
		) : (
			<LineSquiggle color='currentColor' size={16} />
		);

	return (
		<Box position='absolute' top={95} right={1.5} zIndex={1}>
			<IconButton
				aria-label='Toggle Map Type'
				backgroundColor='transparent'
				color='black'
				_hover={{ color: theme.colors.bg.teal }}
				onClick={() => {
					const newMapType = type === 'normal' ? 'heat' : 'normal';
					onChange(newMapType);
				}}
			>
				{Icon}
			</IconButton>
		</Box>
	);
};
