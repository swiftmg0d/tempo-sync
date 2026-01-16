import { flex, SIDEBAR_OFFSET, text } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { scrollbar } from './Sidebar.styles';

const Aside = styled.aside`
	display: none;

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		${flex({ direction: 'column' })}

		background-color: ${({ theme }) => theme.colors.bg.lightSecondary};
		border-right: 1px solid ${({ theme }) => theme.colors.border.primaryRgb(0.09)};
		width: ${SIDEBAR_OFFSET}px;
		position: fixed;
		height: 100dvh;
	}
`;

const Section = styled.div<{
	$flex?: number;
	$border?: 'top' | 'bot';
	$overflow?: 'show' | 'hidden';
	$disabled?: boolean;
	$varient?: 'footer' | 'header' | 'content';
}>`
	flex: ${(props) => props.$flex ?? 0};
	padding: ${({ theme }) => theme.spacing.md} 0;

	${({ $varient, theme, $border, $overflow, $disabled }) => css`
		${$varient === 'footer' &&
		`
			padding: ${theme.spacing.lg};
		`}
		${$border === 'top' &&
		`
			border-top: 1px solid ${theme.colors.border.primaryRgb(0.08)};
		`}
		${$border === 'bot' &&
		`
			border-bottom: 1px solid ${theme.colors.border.primaryRgb(0.08)};
		`}
		${$overflow === 'show' &&
		css`
			overflow-y: auto;
			${scrollbar}
		`}
		${$disabled && `pointer-events: none; opacity: 0.6;`}
	`}
`;

const HeaderTitle = styled.h1`
	${text({ weight: 'bold', size: 'lg' })}
`;

const HeaderDescription = styled.p`
	${text({ weight: 'bold', size: 'xs', color: 'secondary' })}

	text-transform: uppercase;
`;

export const Sidebar = {
	Aside,
	Section,
	HeaderTitle,
	HeaderDescription
};

export const Footer = styled.div`
	${flex({ direction: 'row' })}
	${({ theme }) => css`
		gap: ${theme.spacing.md};
		padding: ${theme.spacing.sm};
		border-radius: ${theme.radii.md};

		&:hover {
			background-color: ${theme.colors.bg.blackAlpha2};
		}
	`}
`;

export const ActivityCardsContainer = styled.div`
	${flex({ direction: 'column' })}

	gap:${({ theme }) => theme.spacing.md};
	overflow-y: auto;
`;
