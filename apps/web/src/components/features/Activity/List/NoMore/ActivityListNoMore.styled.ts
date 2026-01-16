import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flex, text } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column', gap: 'sm', justifyContent: 'center', alignItems: 'center' })}

	${({ theme }) => css`
		padding-top: ${theme.spacing.xxl};
		padding-bottom: ${theme.spacing.sm};
	`};
`;

const Divider = styled.div`
	height: 1px;
	flex: 1;
	background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
`;

const IconContainer = styled.div`
	${flex({ direction: 'row', alignItems: 'center' })}
	width: 100%;
`;

const Text = styled.p`
	${text({ size: 'xxs', weight: 'medium', color: 'secondary' })}
`;

export const ActivityListNoMore = {
	Container,
	Text,
	Divider,
	IconContainer
};
