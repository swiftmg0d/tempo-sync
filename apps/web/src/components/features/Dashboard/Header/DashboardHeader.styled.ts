import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DashboardHeaderSkeleton } from './DashboardHeader.skeleton';

import { flex, size, text } from '@/styles';
import { withSkeleton } from '@/utils';

const Container = styled.header`
	${flex({ direction: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 'md' })}
	${size('100%', 'auto')}

	position: sticky;
	top: 0;
	z-index: 10;

	${({ theme }) => css`
		background-color: ${theme.colors.bg.lightPrimary(0.95)};
		border-bottom: 1px solid ${theme.colors.border.primaryRgb(0.08)};
		padding: ${theme.spacing.lg} ${theme.spacing.xxl};
		backdrop-filter: blur(12px);
		box-shadow: ${theme.shadows.sm};
	`}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		${flex({ direction: 'row', alignItems: 'center' })}
		${size('100%', '80px')}
	}
`;

const SyncInfoContainer = styled.div`
	display: none;

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		${flex({ direction: 'row', gap: 'md', alignItems: 'center' })}
	}
`;

const SyncLabel = styled.span`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
`;

const SyncStatusBase = styled.span<{ $disabled: boolean }>`
	${text({ size: 'xs', weight: 'regular', color: 'secondary' })}
	${({ $disabled, theme }) =>
		`color: ${!$disabled ? theme.colors.text.teal : theme.colors.text.secondary};`}
`;

const SyncStatus = withSkeleton(SyncStatusBase, DashboardHeaderSkeleton.SyncStatus);

const MobileNavWrapper = styled.div`
	width: 100%;
	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		display: none;
	}
`;
export const DashboardHeader = {
	Container,
	SyncInfoContainer,
	SyncStatus,
	SyncLabel,
	MobileNavWrapper
};
