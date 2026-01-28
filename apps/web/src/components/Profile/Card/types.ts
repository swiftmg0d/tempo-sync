import type { IconName } from '../../icons';

export interface ProfileCardProps {
	icon: IconName;
	header: string;
	infoTitle: string;
	infoValue: string;
	href: string;
}
