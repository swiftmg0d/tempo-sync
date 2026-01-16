import { size } from '@/styles';
import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';

const SyncStatus = styled(Skeleton)`
	${size('45px', '12px')}

	display: inline-block;
	background-color: ${({ theme }) => theme.colors.skeleton.base};
	border-radius: ${({ theme }) => theme.radii.xs};
`;

export const DashboardHeaderSkeleton = {
	SyncStatus
};
