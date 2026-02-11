import { Box } from '@chakra-ui/react/box';
import { useEffect, useState } from 'react';

import * as D from './DashboardHeader.styled';
import { buttonsGroup } from './constants';

import { Button } from '@/components/Button';
import { ButtonGroup } from '@/components/ButtonGroup';
import { Icons } from '@/components/icons';
import { BrandHeader } from '@/features/Sidebar/BrandHeader';
import { Queries } from '@/hooks/quieries';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';
import { useActiveScreenStore, useActivityCardsStore } from '@/store';

export const DashboardHeader = () => {
	const RetryIcon = Icons.retry;

	const [toggleRetry, setToggleRetry] = useState(false);

	const setActiveScreenIndex = useActiveScreenStore((state) => state.setActiveScreenIndex);
	const isEmpty = useActivityCardsStore((state) => state.isEmpty);
	const { isLoading, data, refetch, isSuccess, dataUpdatedAt } = Queries.useSyncStatus();

	useEffect(() => {
		if (isSuccess) {
			void queryClient.invalidateQueries({ queryKey: queryKeys.activity.list });
		}
	}, [isSuccess, dataUpdatedAt]);

	return (
		<D.DashboardHeader.Container>
			<D.DashboardHeader.MobileNavWrapper>
				<BrandHeader />
			</D.DashboardHeader.MobileNavWrapper>

			<ButtonGroup
				group={buttonsGroup}
				onChange={(index) => {
					setActiveScreenIndex(index);
				}}
				disabled={!!isEmpty}
			/>

			<D.DashboardHeader.SyncInfoContainer>
				<Box alignItems='center' direction='row' display='flex' gap='4px'>
					<D.DashboardHeader.SyncLabel>Last synced: </D.DashboardHeader.SyncLabel>
					<D.DashboardHeader.SyncStatus isLoading={isLoading} $disabled={!!isEmpty}>
						{isEmpty ? '\t$Never' : `\t${data}`}
					</D.DashboardHeader.SyncStatus>
				</Box>
				<Button
					disabled={!!isEmpty}
					active={false}
					style={{ paddingX: 's', paddingY: 'sm' }}
					variant='border'
					onClick={() => {
						void refetch();
						setToggleRetry(true);
						setTimeout(() => {
							setToggleRetry(false);
						}, 1000);
					}}
				>
					<RetryIcon isRetrying={toggleRetry} />
				</Button>
			</D.DashboardHeader.SyncInfoContainer>
		</D.DashboardHeader.Container>
	);
};
