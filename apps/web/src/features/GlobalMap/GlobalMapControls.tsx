import { Box, IconButton } from '@chakra-ui/react';
import { Flame, Hexagon } from 'lucide-react';

import { theme } from '@/styles';

export const MapTypeControl = ({
	onHeatToggle,
	onHexToggle,
	type,
	showHex
}: {
	type: 'normal' | 'heat' | boolean;
	showHex: boolean;
	onHeatToggle: (mapType: 'normal' | 'heat') => void;
	onHexToggle: (showHex: boolean) => void;
}) => {
	return (
		<Box position='absolute' top={100} right={0}>
			<Box
				marginRight='5px'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
			>
				<IconButton
					aria-label='Toggle Map Type'
					backgroundColor='transparent'
					color={type === 'heat' ? theme.colors.bg.teal : theme.colors.text.primary}
					_hover={{ color: theme.colors.bg.teal }}
					onClick={() => {
						onHeatToggle(type === 'normal' ? 'heat' : 'normal');
					}}
				>
					<Flame color='currentColor' size={16} />
				</IconButton>
				<IconButton
					color={showHex ? theme.colors.bg.teal : theme.colors.text.primary}
					_hover={{ color: theme.colors.bg.teal }}
					backgroundColor='transparent'
					onClick={() => {
						onHexToggle(!showHex);
					}}
				>
					<Hexagon size={16} />
				</IconButton>
			</Box>
		</Box>
	);
};
