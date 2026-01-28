import { Box } from '@chakra-ui/react';

import { Icons } from '../../icons';

import * as P from './ProfileCard.styled';
import type { ProfileCardProps } from './types';

export const ProfileCard = ({ icon, header, infoTitle, infoValue, href }: ProfileCardProps) => {
	const Icon = Icons[icon];

	return (
		<P.ProfileCard.Container onClick={() => window.open(href, '_blank')}>
			<Icon active={false} />
			<P.ProfileCard.Header>{header}</P.ProfileCard.Header>
			<P.ProfileCard.Label>
				<Box height='6px' width='6px' borderRadius='full' backgroundColor='#10b981' />
				Connected
			</P.ProfileCard.Label>
			<P.ProfileCard.InfoContainer>
				<P.ProfileCard.InfoTitle>{infoTitle}</P.ProfileCard.InfoTitle>
				<P.ProfileCard.InfoValue>{infoValue}</P.ProfileCard.InfoValue>
			</P.ProfileCard.InfoContainer>
		</P.ProfileCard.Container>
	);
};
