import { Box } from '@chakra-ui/react';

import { ProfileCard } from '../Card';

import { ProfileListSkeleton } from './ProfileList.skeleton';
import type { ProfileListProps } from './types';

import type { IconName } from '@/components/icons';
import { withSkeleton } from '@/utils';

const ProfileListComponent = ({ profiles }: ProfileListProps) => {
	return (
		<Box display='flex' flexDirection='row' gap='16px' flexWrap='wrap' marginTop='48px'>
			{profiles.map(({ name, url, id, title }) => (
				<ProfileCard
					key={id}
					icon={name.toLocaleLowerCase() as IconName}
					header={name + ' Profile'}
					infoTitle={title}
					href={url || ''}
				/>
			))}
		</Box>
	);
};

export const ProfileList = withSkeleton(ProfileListComponent, ProfileListSkeleton);
