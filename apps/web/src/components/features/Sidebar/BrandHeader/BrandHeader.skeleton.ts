import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { pulseWaveBaseCss } from './BrandHedaer.styles';

import { desktopOnly, size } from '@/styles';

const SyncInfo = styled(Skeleton)`
	${size('34px', '15px')}

	${desktopOnly}


	background-color: ${({ theme }) => theme.colors.skeleton.base};
	border-radius: ${({ theme }) => theme.radii.xs};
`;

const PulseWave = styled(Skeleton)`
	${pulseWaveBaseCss('skeleton')}
`;

export const BrandHeaderSkeleton = {
	SyncInfo,
	PulseWave
};
