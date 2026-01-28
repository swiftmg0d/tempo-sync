import { Box } from '@chakra-ui/react';
import type { Profile } from '@tempo-sync/shared';

import { ProfileCard } from '../Card';

import { ProfileListSkeleton } from './ProfileList.skeleton';

import type { IconName } from '@/components/icons';
import { withSkeleton } from '@/utils';

const ProfileListComponent = ({ profiles }: { profiles: Profile[] }) => {
	return (
		<Box display='flex' flexDirection='row' gap='16px' flexWrap='wrap' marginTop='48px'>
			{profiles.map(({ name, url, id }) => (
				<ProfileCard
					key={id}
					icon={name.toLocaleLowerCase() as IconName}
					header={name + ' Profile'}
					infoTitle=''
					infoValue=''
					href={url || ''}
				/>
			))}
		</Box>
	);
};

export const ProfileList = withSkeleton(ProfileListComponent, ProfileListSkeleton);
