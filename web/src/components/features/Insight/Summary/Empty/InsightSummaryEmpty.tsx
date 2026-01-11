import * as I from './InsightSummaryEmpty.styled';
import { InsightSummaryHero } from '../Hero';
import { SyncImage } from './SyncImage';
import { motion } from 'motion/react';
import { transition } from '@/styles';

export const InsightSummaryEmpty = () => {
	return (
		<I.InsightSummaryEmpty.Container>
			<motion.div {...transition(0.3)}>
				<InsightSummaryHero buttonText='Attempt Sync Now' isLoading={false} variant='secondary' />
			</motion.div>
			<I.InsightSummaryEmpty.InfoContainer>
				<I.InsightSummaryEmpty.InfoHeader {...transition(0.5)}>
					No Recent Activities Found.
				</I.InsightSummaryEmpty.InfoHeader>
				<I.InsightSummaryEmpty.InfoSubHeader {...transition(0.7)}>
					It looks like there are no recent activities to display. This might be due to a sync
					issue, backend maintenance, or no new activities from your connected accounts. Please try
					syncing again or check your account settings.
				</I.InsightSummaryEmpty.InfoSubHeader>
				<motion.div {...transition(1)}>
					<SyncImage />
				</motion.div>
			</I.InsightSummaryEmpty.InfoContainer>
		</I.InsightSummaryEmpty.Container>
	);
};
