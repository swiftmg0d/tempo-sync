import { withSkeleton } from '@/utils';
import * as A from './AccountInfo.styled';
import { AccountInfoSkeleton } from './AccountInfo.skeleton';
import type { AccountInfoProps } from './types';

const AccountInfoComponent = ({ header, subHeader }: AccountInfoProps) => {
	return (
		<>
			<A.AccountInfo.Container>
				<A.AccountInfo.Header>{header}</A.AccountInfo.Header>
				<A.AccountInfo.SubHeader>{subHeader}</A.AccountInfo.SubHeader>
			</A.AccountInfo.Container>
		</>
	);
};

export const AccountInfo = withSkeleton(AccountInfoComponent, AccountInfoSkeleton);
