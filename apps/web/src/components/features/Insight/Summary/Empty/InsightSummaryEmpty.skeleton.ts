import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';

const InfoHeaderSkeleton = styled(Skeleton)`
	background-color: ${({ theme }) => theme.colors.skeleton.base};

	height: 24px;
	width: clamp(150px, 50vw, 300px);
	border-radius: ${({ theme }) => theme.radii.md};
`;

const InfoSubHeaderSkeleton = styled(Skeleton)`
	background-color: ${({ theme }) => theme.colors.skeleton.base};
	height: 100px;
	width: clamp(200px, 10 vw, 400px);
	border-radius: ${({ theme }) => theme.radii.md};
`;

export const InsightSummaryEmptySkeleton = {
	InfoHeaderSkeleton,
	InfoSubHeaderSkeleton
};
