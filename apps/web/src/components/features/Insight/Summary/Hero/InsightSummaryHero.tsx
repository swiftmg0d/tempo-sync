import { InsightSummaryHeroSkeleton } from './InsightSummaryHero.skeleton';
import * as I from './InsightSummaryHero.styled';
import type { InsightsSummaryHeroProps } from './types';

import analysisIllustration from '@/assets/images/analysis-illustration.svg';
import { Button } from '@/components/ui/Button';
import { transition } from '@/styles';
import { withSkeleton } from '@/utils';

const InsightSummaryHeroComponent = ({
	buttonText,
	variant = 'primary'
}: InsightsSummaryHeroProps) => {
	return (
		<I.InsightSummaryHero.Container>
			<I.InsightSummaryHero.InfoContainer>
				<I.InsightSummaryHero.InfoHeader {...transition(0.3)}>
					Analyze Your Runs with Music Insights.
				</I.InsightSummaryHero.InfoHeader>
				<I.InsightSummaryHero.InfoSubHeader {...transition(0.4)}>
					TempoSync merges your Strava activities with Spotify data to reveal your optimal flow
					state. Discover how your playlist impacts your pace and heart rate.
				</I.InsightSummaryHero.InfoSubHeader>

				<Button
					active
					style={{ height: '48px', width: 'max-content' }}
					onClick={() => {
						if (variant !== 'primary') window.location.reload();
					}}
				>
					<I.InsightSummaryHero.ButtonText>{buttonText}</I.InsightSummaryHero.ButtonText>
				</Button>
			</I.InsightSummaryHero.InfoContainer>

			<I.InsightSummaryHero.Image src={analysisIllustration} alt='Analysis Illustration' />
		</I.InsightSummaryHero.Container>
	);
};

export const InsightSummaryHero = withSkeleton(
	InsightSummaryHeroComponent,
	InsightSummaryHeroSkeleton
);
