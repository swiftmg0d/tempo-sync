import { Box, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';

import { theme } from '@/styles';
export const DiscoveryStats = ({ isEmpty, value }: { isEmpty: boolean; value: number }) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ type: 'spring', stiffness: 400, damping: 25 }}
			style={{
				position: 'absolute',
				top: 10,
				left: 10,
				zIndex: 1,
				boxShadow: theme.shadows.lg,
				borderRadius: theme.radii.md,
				padding: theme.spacing.sm,
				backgroundColor: theme.colors.bg.white(),
				fontFamily: theme.fonts.sans
			}}
		>
			<Box paddingX={theme.spacing.xs} position='relative'>
				<Text
					as='p'
					fontSize={theme.fontSizes.xxs}
					fontWeight={theme.fontWeights.bold}
					textTransform='uppercase'
					color={theme.colors.text.muted}
				>
					Discovered Area
				</Text>
				<Text
					as='p'
					color={theme.colors.text.teal}
					fontWeight={theme.fontWeights.bold}
					fontSize={theme.fontSizes.xl}
				>
					{isEmpty ? '0.00%' : `${value.toFixed(2)}%`}
				</Text>
			</Box>
		</motion.div>
	);
};
