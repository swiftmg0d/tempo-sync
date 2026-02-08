import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { blur, flex, text } from '@/styles';

const Container = styled.div<{ $flex?: number }>`
	${blur(24)}
	box-sizing: border-box;
	width: 100%;
	min-width: 0;

	flex: ${({ $flex }) => $flex ?? 1};

	${({ theme }) => css`
		background-color: ${theme.colors.bg.white(0.8)};
		border: 1px solid ${theme.colors.border.primaryRgb(0.05)};
		border-radius: ${theme.radii.lg};
		box-shadow: ${theme.shadows.sm};

		padding: ${theme.spacing.lg} ${theme.spacing.md};

		@media (min-width: ${theme.breakpoints.md}) {
			padding: ${theme.spacing.xxl};
		}
	`};
`;

const HeaderSection = styled.section`
	${flex({ direction: 'row', alignItems: 'center', gap: 'sm' })}

	padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const HeaderTitle = styled.h2`
	${text({ size: 'sm', weight: 'bold', color: 'primary' })}

	text-transform: uppercase;
`;

const TrackList = styled.div`
	${flex({ direction: 'column', gap: 'md' })}
`;

const EmptyState = styled.div`
	${flex({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}
	${text({ size: 'sm', weight: 'regular', color: 'secondary' })}
	height: 100%;
	flex: 1;

	text-align: center;
	padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

export const TrackLeaderboardStyled = {
	Container,
	HeaderSection,
	HeaderTitle,
	TrackList,
	EmptyState
};
