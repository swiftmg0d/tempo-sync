import { withSkeleton } from '@/utils';
import { Avatar as AvatarBase } from '@chakra-ui/react';
import { AvatarSkeleton } from './Avatar.skeleton';
import type { AvatarProps } from './types';

const AvatarComponent = ({ fallbackName, image }: AvatarProps) => {
	return (
		<AvatarBase.Root>
			<AvatarBase.Fallback name={fallbackName} />
			<AvatarBase.Image src={image} />
		</AvatarBase.Root>
	);
};

export const Avatar = withSkeleton(AvatarComponent, AvatarSkeleton);
