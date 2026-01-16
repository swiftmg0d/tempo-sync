import { Icons } from '@/components/icons';
import * as A from './ActivityListNoMore.styled';
import { Box } from '@chakra-ui/react';
import { theme } from '@/styles';
export const ActivityListNoMore = () => {
	const FlagIcon = Icons.flag;
	return (
		<A.ActivityListNoMore.Container>
			<A.ActivityListNoMore.IconContainer>
				<A.ActivityListNoMore.Divider />
				<Box p={theme.spacing.s} bgColor={theme.colors.bg.alto2} borderRadius={theme.radii.md}>
					<FlagIcon />
				</Box>
				<A.ActivityListNoMore.Divider />
			</A.ActivityListNoMore.IconContainer>
			<A.ActivityListNoMore.Text>
				You've reached the beginning of your journey
			</A.ActivityListNoMore.Text>
		</A.ActivityListNoMore.Container>
	);
};
