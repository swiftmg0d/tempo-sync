import { size } from '@/styles';
import { Skeleton } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const TitleSkleton = styled(Skeleton)`
	${({ theme }) => css`
		background-color: ${theme.colors.skeleton.base};
		width: 50px;
		height: 18px;
		border-radius: ${theme.radii.sm};
	`}
`;

const InfoSkeleton = styled(Skeleton)`
	${({ theme }) => css`
		background-color: ${theme.colors.skeleton.base};
		width: 100%;
		height: 14px;
		border-radius: ${theme.radii.xs};
	`}
`;

const ScoreLabelSkeleton = styled(Skeleton)`
	${({ theme }) => css`
		background-color: ${theme.colors.skeleton.base};
		width: 35px;
		height: 20px;
		align-self: flex-end;
		padding-top: ${theme.spacing.sm};
		border-radius: ${theme.radii.xs};
	`}
`;

const ScoreValueSkeleton = styled(Skeleton)`
	${({ theme }) => css`
		background-color: ${theme.colors.skeleton.base};
		width: 35px;
		height: 45px;
		border-radius: ${theme.radii.sm};
	`}
`;

const IconContainerSkeleton = styled(Skeleton)`
	${size('40px')}
	${({ theme }) => css`
		background-color: ${theme.colors.skeleton.base};
		border-radius: ${theme.radii.sm};
	`}
`;
export const InsightCardSkeleton = {
	TitleSkleton,
	InfoSkeleton,
	ScoreLabelSkeleton,
	ScoreValueSkeleton,
	IconContainerSkeleton
};
