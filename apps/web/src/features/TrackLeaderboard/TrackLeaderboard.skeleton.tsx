import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { flex } from '@/styles';

const SkeletonItem = styled(Skeleton)`
	background-color: ${({ theme }) => theme.colors.skeleton.base} !important;
	height: 100px;
	width: 100%;
	border-radius: ${({ theme }) => theme.radii.md} !important;
`;

const Container = styled.div`
	${flex({ direction: 'column', gap: 'md' })}
`;

export const TrackLeaderboardSkeleton = () => (
	<Container>
		<SkeletonItem />
		<SkeletonItem />
		<SkeletonItem />
	</Container>
);
