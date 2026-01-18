import { chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

import type { AppTheme } from './theme';

import type { PaddingSide } from '@/types/styles';

export const Padded = styled.div<{
	$p?: keyof AppTheme['spacing'];
	$side?: PaddingSide;
}>`
	position: relative;

	${({ theme, $p = 'md', $side = 'x' }) => {
		const v = theme.spacing[$p];

		switch ($side) {
			case 'left':
				return `padding-left: ${v};`;
			case 'right':
				return `padding-right: ${v};`;
			case 'top':
				return `padding-top: ${v};`;
			case 'bottom':
				return `padding-bottom: ${v};`;
			case 'y':
				return `padding: ${v} 0;`;
			case 'all':
				return `padding: ${v};`;
			case 'none':
				return `padding: 0;`;
			case 'x':
			default:
				return `padding: 0 ${v};`;
		}
	}}
`;

export const MobileOnly = styled.div`
	display: block;
	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		display: none;
	}
`;

export const DesktopOnly = styled.div`
	display: none;
	@media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
		display: block;
	}
`;

export const Box = chakra('div');
