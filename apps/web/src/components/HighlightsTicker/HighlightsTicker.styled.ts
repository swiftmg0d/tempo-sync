import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { flex, text } from '@/styles';

const scroll = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-50%);
	}
`;

const Wrapper = styled.div`
	overflow: hidden;
	width: 100%;
	margin-top: auto;

	${({ theme }) => css`
		padding-top: ${theme.spacing.md};
		border-top: 1px solid ${theme.colors.border.primaryRgb(0.05)};
	`}
`;

const Track = styled.div<{ $duration: number }>`
	${flex({ direction: 'row', alignItems: 'center' })}

	width: max-content;
	animation: ${scroll} ${({ $duration }) => $duration}s linear infinite;

	&:hover {
		animation-play-state: paused;
	}
`;

const ItemGroup = styled.div`
	${flex({ direction: 'row', alignItems: 'center', gap: 'lg' })}

	flex-shrink: 0;

	${({ theme }) => css`
		padding-right: ${theme.spacing.lg};
	`}
`;

const Item = styled.span`
	${flex({ direction: 'row', alignItems: 'center' })}
	${text({ size: 'xs', weight: 'bold' })}

	gap: 6px;
	white-space: nowrap;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const Label = styled.span`
	${text({ color: 'secondary', size: 'xs', weight: 'bold' })}
`;

const Value = styled.span`
	${({ theme }) => css`
		color: ${theme.colors.bg.teal};
		font-weight: ${theme.fontWeights.bold};
		font-size: ${theme.fontSizes.xs};
	`}
`;

const Separator = styled.span`
	${({ theme }) => css`
		color: ${theme.colors.text.secondary};
		font-size: ${theme.fontSizes.xxs};
		opacity: 0.5;
	`}
`;

export const HighlightsTicker = {
	Wrapper,
	Track,
	ItemGroup,
	Item,
	Label,
	Value,
	Separator
};
