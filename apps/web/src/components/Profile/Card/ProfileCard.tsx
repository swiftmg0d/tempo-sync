import { Box } from '@chakra-ui/react';

import { Icons } from '../../icons';

import * as P from './ProfileCard.styled';
import type { ProfileCardProps } from './types';

import { Queries } from '@/hooks/quieries';

export const ProfileCard = ({ icon, header, infoTitle, href }: ProfileCardProps) => {
	const Icon = Icons[icon];

	const { isLoading: isTotalActivitiesLoading, data: totalActivitiesData } =
		Queries.useAthleteTotalActivities({
			enabled: infoTitle === 'Total Activities:'
		});

	const { isLoading, data } = Queries.useAthleteTopArtist({
		enabled: infoTitle === 'Top Artist:'
	});

	return (
		<P.ProfileCard.Container onClick={() => window.open(href, '_blank')}>
			<Icon active={false} />
			<P.ProfileCard.Header>{header}</P.ProfileCard.Header>
			<P.ProfileCard.Label>
				<Box
					height='6px'
					width='6px'
					borderRadius='full'
					backgroundColor='#10b981'
					as='span'
					display='block'
				/>
				Connected
			</P.ProfileCard.Label>
			<P.ProfileCard.InfoContainer>
				<P.ProfileCard.InfoTitle>{infoTitle}</P.ProfileCard.InfoTitle>
				{infoTitle === 'Top Artist:' && data?.href ? (
					<P.ProfileCard.InfoValue
						href={data.href}
						target='_blank'
						rel='noopener noreferrer'
						onClick={(e) => {
							e.stopPropagation();
						}}
						as='a'
						isLoading={isLoading}
					>
						{data.name}
					</P.ProfileCard.InfoValue>
				) : (
					<P.ProfileCard.InfoValue
						as='span'
						isLoading={infoTitle === 'Total Activities:' ? isTotalActivitiesLoading : isLoading}
					>
						{infoTitle === 'Total Activities:'
							? (totalActivitiesData?.count ?? 'N/A')
							: (data?.name ?? 'N/A')}
					</P.ProfileCard.InfoValue>
				)}
			</P.ProfileCard.InfoContainer>
		</P.ProfileCard.Container>
	);
};
