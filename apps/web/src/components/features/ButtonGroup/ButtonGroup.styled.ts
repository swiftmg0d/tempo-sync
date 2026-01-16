import styled from '@emotion/styled';

import { defaultBorderState, flex } from '@/styles';

const Container = styled.div<{ $disabled?: boolean }>`
	${flex({ direction: 'row' })}

	${defaultBorderState}

	${({ $disabled }) => `
		opacity: ${$disabled ? '0.5' : '1'};
	`}
    width: 100%;
	padding: ${({ theme }) => theme.spacing.s};
	border-radius: ${({ theme }) => theme.radii.md};
	background-color: ${({ theme }) => theme.colors.bg.lightSecondary};

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		width: auto;
	}
`;

const Label = styled.span<{ $shownOn?: 'base' | 'lg' }>`
	${({ $shownOn }) => $shownOn !== 'base' && 'display: none;'}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		${({ $shownOn }) => $shownOn === 'lg' && 'display: inline;'}
		${({ $shownOn }) => $shownOn === 'base' && 'display: none;'}
	}
`;

export const ButtonGroup = {
	Container,
	Label
};
