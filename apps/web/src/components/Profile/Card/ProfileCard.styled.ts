import { Skeleton } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { defaultBorderState, flex, text, transitionAll } from '@/styles';
import { withSkeleton } from '@/utils';

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

	${({ theme }) => css`
		background-color: ${theme.mode === 'dark'
			? 'rgba(16, 185, 129, 0.1)'
			: 'rgba(240, 253, 244, 1)'};
		color: #10b981;
		padding: ${theme.spacing.xs} ${theme.spacing.sm};
	`}
`;

const InfoContainer = styled.div`
	${flex({ direction: 'column', gap: 's', justifyContent: 'center', alignItems: 'center' })}

	@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
		${flex({ direction: 'row', gap: 's', justifyContent: 'center', alignItems: 'center' })}
	}
`;

const InfoTitle = styled.h3`
	${text({ size: 'md', weight: 'regular' })}
`;

const InfoValueStyled = styled.a`
	${text({ size: 'md', weight: 'bold', color: 'primary' })}

	display: inline-block;
`;

const InfoValueSkleton = styled(Skeleton)`
	width: 40px;
	height: 15px;
	background-color: ${({ theme }) => theme.colors.skeleton.base};
	border-radius: ${({ theme }) => theme.radii.md};
`;

const InfoValue = withSkeleton(InfoValueStyled, InfoValueSkleton);

export const ProfileCard = {
	Container,
	Header,
	Label,
	InfoContainer,
	InfoTitle,
	InfoValue
};
