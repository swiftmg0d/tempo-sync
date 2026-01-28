import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';

const HeaderSkeleton = styled(Skeleton)`
	background-color: ${({ theme }) => theme.colors.skeleton.base} !important;
	height: 20px;
	width: 150px;
	border-radius: ${({ theme }) => theme.radii.sm} !important;
`;

const DescriptionSkeleton = styled(Skeleton)`
	background-color: ${({ theme }) => theme.colors.skeleton.base} !important;
	height: 14px;
	width: 100%;
	flex: 1;

	border-radius: ${({ theme }) => theme.radii.sm} !important;
`;

export const InsightCardSkeleton = {
	Header: HeaderSkeleton,
	Description: DescriptionSkeleton
};
