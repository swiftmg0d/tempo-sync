import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { defaultBorderState, flex, text, transitionAll } from '@/styles';

const Container = styled.div`
	${flex({ direction: 'column', gap: 's', justifyContent: 'center', alignItems: 'center' })}
	${transitionAll}
	${defaultBorderState}

    background-color: ${({ theme }) => theme.colors.bg.white(0.7)};
	border-radius: ${({ theme }) => theme.radii.lg};
	padding: ${({ theme }) => theme.spacing.lg};

	flex: 1;

	&:hover {
		transform: scale(1.01);
		cursor: pointer;
	}
`;

const Header = styled.h2`
	${text({ size: 'lg', weight: 'bold', color: 'primary' })}
	${({ theme }) => css`
		padding-bottom: ${theme.spacing.xs};
	`}
`;

const Label = styled.p`
	${flex({ direction: 'row', gap: 'xs', justifyContent: 'center', alignItems: 'center' })}
	${text({ size: 'xs', weight: 'bold' })}


	background-color: rgba(240, 253, 244, 1);
	color: #10b981;
	padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
`;

const InfoContainer = styled.div`
	${flex({ direction: 'row', gap: 's', justifyContent: 'center', alignItems: 'center' })}
`;

const InfoTitle = styled.h3`
	${text({ size: 'md', weight: 'regular' })}
`;

const InfoValue = styled.p`
	${text({ size: 'md', weight: 'bold', color: 'primary' })}
`;

export const ProfileCard = {
	Container,
	Header,
	Label,
	InfoContainer,
	InfoTitle,
	InfoValue
};
