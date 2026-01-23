import { motion } from 'motion/react';

import { StatsOverviewHero } from '../Hero';

import * as S from './StatsOverviewEmpty.styled';
import { SyncImage } from './SyncImage';

import { transition } from '@/styles';

export const StatsOverviewEmpty = () => {
	return (
		<S.StatsOverviewEmpty.Container>
			<motion.div {...transition(0.3)}>
				<StatsOverviewHero buttonText='Attempt Sync Now' isLoading={false} variant='secondary' />
			</motion.div>
			<S.StatsOverviewEmpty.InfoContainer>
				<S.StatsOverviewEmpty.InfoHeader {...transition(0.5)}>
					No Recent Activities Found.
				</S.StatsOverviewEmpty.InfoHeader>
				<S.StatsOverviewEmpty.InfoSubHeader {...transition(0.7)}>
					It looks like there are no recent activities to display. This might be due to a sync
					issue, backend maintenance, or no new activities from your connected accounts. Please try
					syncing again or check your account settings.
				</S.StatsOverviewEmpty.InfoSubHeader>
				<motion.div {...transition(1)}>
					<SyncImage />
				</motion.div>
			</S.StatsOverviewEmpty.InfoContainer>
		</S.StatsOverviewEmpty.Container>
	);
};
