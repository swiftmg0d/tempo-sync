import type { Profile } from '@tempo-sync/shared';

export interface ProfileListProps {
	profiles: (Profile & { title: string })[];
}
