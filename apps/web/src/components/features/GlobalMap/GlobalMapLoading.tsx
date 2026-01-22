import { Box, ProgressCircle, Text } from '@chakra-ui/react';

import { theme } from '@/styles';

export const GlobalMapLoading = () => {
	const loadingMessages = [
		'Mapping your journey…',
		'Syncing your adventures…',
		'Locking onto your route…',
		'Analyzing your effort…',
		'Replaying your activity…',
		'Measuring every stride…',
		'Tracking performance data…'
	];
	const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

	return (
		<Box
			position='absolute'
			top='50%'
			left='50%'
			transform='translate(-50%, -50%)'
			paddingX={theme.spacing.xl}
			paddingY={theme.spacing.md}
			borderRadius='8px'
			zIndex={1000}
			display='flex'
			alignItems='center'
			flexDirection='column'
			gap={theme.spacing.s}
		>
			<ProgressCircle.Root value={null} size='xs'>
				<ProgressCircle.Circle>
					<ProgressCircle.Track />
					<ProgressCircle.Range stroke={theme.colors.accent.teal50} />
				</ProgressCircle.Circle>
			</ProgressCircle.Root>

			<Text
				fontSize={theme.fontSizes.xs}
				textAlign='center'
				md={{
					fontSize: theme.fontSizes.md
				}}
				color={theme.colors.text.secondary}
				fontWeight={theme.fontWeights.medium}
			>
				{randomMessage}
			</Text>
		</Box>
	);
};
