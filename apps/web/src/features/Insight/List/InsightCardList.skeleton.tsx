import { InsightCard } from '../Card';

import * as I from './InsightCardList.styled';

export const InsightCardListSkeleton = () => {
	const totalSlides = 3;
	const insights = Array.from({ length: totalSlides }).map((_, index) => ({
		title: `Loading Title ${index + 1}`,
		description: `Loading Description ${index + 1}`
	}));

	return (
		<I.InsightCardList.Container>
			<I.InsightCardList.CardsContainer $currentSlide={0}>
				{insights.map((insight, _) => (
					<I.InsightCardList.CardWrapper key={insight.title}>
						<InsightCard title={insight.title} description={insight.description} isLoading />
					</I.InsightCardList.CardWrapper>
				))}
			</I.InsightCardList.CardsContainer>
		</I.InsightCardList.Container>
	);
};
