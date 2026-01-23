import { StatsOverviewHeroSkeleton } from './StatsOverviewHero.skeleton';
import * as S from './StatsOverviewHero.styled';
import type { SummaryHeroProps } from './types';

import analysisIllustration from '@/assets/images/analysis-illustration.svg';
import { Button } from '@/components/ui/Button';
import { transition } from '@/styles';
import { withSkeleton } from '@/utils';

const StatsOverviewHeroComponent = ({ buttonText, variant = 'primary' }: SummaryHeroProps) => {
	return (
		<S.StatsOverviewHero.Container>
			<S.StatsOverviewHero.InfoContainer>
				<S.StatsOverviewHero.InfoHeader {...transition(0.3)}>
					Analyze Your Runs with Music Insights.
				</S.StatsOverviewHero.InfoHeader>
				<S.StatsOverviewHero.InfoSubHeader {...transition(0.4)}>
					TempoSync merges your Strava activities with Spotify data to reveal your optimal flow
					state. Discover how your playlist impacts your pace and heart rate.
				</S.StatsOverviewHero.InfoSubHeader>

				<Button
					active
					style={{ height: '48px', width: 'max-content' }}
					onClick={() => {
						if (variant !== 'primary') window.location.reload();
					}}
				>
					<S.StatsOverviewHero.ButtonText>{buttonText}</S.StatsOverviewHero.ButtonText>
				</Button>
			</S.StatsOverviewHero.InfoContainer>

			<S.StatsOverviewHero.Image
				src={analysisIllustration}
				alt='Analysis Illustration'
				fetchPriority='high'
			/>
		</S.StatsOverviewHero.Container>
	);
};

export const StatsOverviewHero = withSkeleton(
	StatsOverviewHeroComponent,
	StatsOverviewHeroSkeleton
);
