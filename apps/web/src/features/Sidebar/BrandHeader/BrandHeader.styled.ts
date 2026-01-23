import styled from '@emotion/styled';

import { BrandHeaderSkeleton } from './BrandHeader.skeleton';
import { pulseWaveBaseCss } from './BrandHedaer.styles';

import { defaultBorderState, flex, mobileOnly, text } from '@/styles';
import { withSkeleton } from '@/utils';

const Container = styled.div`
	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		${flex({ direction: 'column', gap: 'xxl' })}
	}
`;

const LogoContainer = styled.div`
	${flex({ direction: 'row', gap: 'sm', alignItems: 'center' })}

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		${flex({ direction: 'row', gap: 'md', alignItems: 'center' })}
	}
`;

const Title = styled.h1`
	${text({ weight: 'bold', size: 'lg' })}
`;

const Description = styled.p`
	${text({ weight: 'bold', size: 'xs', color: 'secondary' })}

	text-transform: uppercase;

	display: none;
	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		display: block;
	}
`;

const SyncContainer = styled.div`
	${flex({ direction: 'row', alignItems: 'center', gap: 'sm' })}

	${defaultBorderState}

	border-radius: 9999px;
	padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
	background-color: ${({ theme }) => theme.colors.bg.lightSecondary};
	margin-left: auto;
`;

const PulseWaveStyled = styled.div<{ $disabled: boolean }>`
	${({ $disabled }) => ($disabled ? pulseWaveBaseCss('skeleton') : pulseWaveBaseCss('base'))}
`;

const SyncInfoStyled = styled.span`
	${text({ weight: 'bold', size: 'xxs', color: 'secondary' })}

	text-transform: uppercase;
`;

const SyncInfoEmpty = styled.span`
	${text({ weight: 'semibold', size: 'xxs', color: 'secondary' })}

	${mobileOnly}

		text-transform: uppercase;
`;

const SyncInfo = withSkeleton(SyncInfoStyled, BrandHeaderSkeleton.SyncInfo);
const PulseWave = withSkeleton(PulseWaveStyled, BrandHeaderSkeleton.PulseWave);

export const BrandHeader = {
	Title,
	Description,
	Container,
	LogoContainer,
	SyncContainer,
	PulseWave,
	SyncInfo,
	SyncInfoEmpty
};
