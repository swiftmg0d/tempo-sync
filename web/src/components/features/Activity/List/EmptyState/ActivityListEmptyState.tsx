import { Icons } from '@/components/icons';
import * as E from './ActivityListEmptyState.styled';
import { Padded } from '@/styles';

export const ActivityListEmptyState = () => {
	const HistoryIcon = Icons.history;

	return (
		<E.ActivityListEmptyState.Container>
			<Padded $side='bottom' $p='lg'>
				<E.ActivityListEmptyState.IconContainer>
					<Padded $side='y' $p='px'>
						<HistoryIcon />
					</Padded>
				</E.ActivityListEmptyState.IconContainer>
			</Padded>
			<E.ActivityListEmptyState.Title>No activity history</E.ActivityListEmptyState.Title>
			<E.ActivityListEmptyState.Description>
				Once the sync is done, recent activity sessions will appear here.
			</E.ActivityListEmptyState.Description>
		</E.ActivityListEmptyState.Container>
	);
};
