import { defaultBorderState, flex, text } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Card = styled.article`
	${flex({ direction: 'column', gap: 'lg' })}

	${defaultBorderState}

    flex: 1;
	min-width: 120px;
	padding: ${({ theme }) => theme.spacing.lg};
	border-radius: ${({ theme }) => theme.radii.lg};

	&:hover {
		${({ theme }) => `background-color: ${theme.colors.bg.blackAlpha2};`}
	}
`;

const Header = styled.h3`
	${flex({ direction: 'row', justifyContent: 'space-between' })}
`;

const Description = styled.p`
	${text({ size: 'xxs', weight: 'bold' })}

	text-transform: uppercase;
`;

const MetricInfoContainer = styled.div`
	${flex({ direction: 'row' })}
`;

const MetricInfo = styled.p<{ $primary?: boolean }>`
	${({ $primary, theme }) => !$primary && `padding-top: ${theme.spacing.lg};`}

	${({ $primary, theme }) =>
		$primary
			? css`
					${text({ size: '3xl', color: 'primary', weight: 'bold' })({ theme })}
				`
			: css`
					${text({ size: 'sm', color: 'secondary', weight: 'regular' })({ theme })}
				`}
`;

export const MetricCard = { Card, Header, Description, MetricInfo, MetricInfoContainer };
