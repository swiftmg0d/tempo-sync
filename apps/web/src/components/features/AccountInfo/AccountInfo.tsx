import { AccountInfoSkeleton } from './AccountInfo.skeleton';
import * as A from './AccountInfo.styled';
import type { AccountInfoProps } from './types';

import { withSkeleton } from '@/utils';

const AccountInfoComponent = ({ header, subHeader }: AccountInfoProps) => {
	return (
		<A.AccountInfo.Container>
			<A.AccountInfo.Header>{header}</A.AccountInfo.Header>
			<A.AccountInfo.SubHeader>{subHeader}</A.AccountInfo.SubHeader>
		</A.AccountInfo.Container>
	);
};

export const AccountInfo = withSkeleton(AccountInfoComponent, AccountInfoSkeleton);
