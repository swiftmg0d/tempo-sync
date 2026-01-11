import { size, theme } from '@/styles';
import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const AvatarSkeleton = styled(Skeleton)`
	${size('40px')}
	border-radius: 100%;
	background-color: ${theme.colors.skeleton.base};
`;
