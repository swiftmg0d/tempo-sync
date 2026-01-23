import { Avatar as AvatarBase } from '@chakra-ui/react';

import { AvatarSkeleton } from './Avatar.skeleton';
import type { AvatarProps } from './types';

import { withSkeleton } from '@/utils';

const AvatarComponent = ({ fallbackName, image }: AvatarProps) => {
	return (
		<AvatarBase.Root>
			<AvatarBase.Fallback name={fallbackName} />
			<AvatarBase.Image src={image} title='Image of the athlete' />
		</AvatarBase.Root>
	);
};

export const Avatar = withSkeleton(AvatarComponent, AvatarSkeleton);
