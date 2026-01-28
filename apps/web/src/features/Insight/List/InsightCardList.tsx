import { InsightCard } from '../Card';

import { InsightCardListSkeleton } from './InsightCardList.skeleton';
import * as I from './InsightCardList.styled';
import type { InsightCardListProps } from './types';

import { withSkeleton } from '@/utils';

const InsightCardListComponent = ({ insights, currentSlide }: InsightCardListProps) => {
	if (insights.length === 0) {
		return (
			<I.InsightCardList.Container>
				<I.InsightCardList.EmptyMessage>No insights available.</I.InsightCardList.EmptyMessage>
			</I.InsightCardList.Container>
		);
	}

	return (
		<I.InsightCardList.Container>
			<I.InsightCardList.CardsContainer $currentSlide={currentSlide}>
				{insights.map((insight) => (
					<I.InsightCardList.CardWrapper key={insight.title}>
						<InsightCard
							title={insight.title}
							description={insight.description}
							isLoading={false}
						/>
					</I.InsightCardList.CardWrapper>
				))}
			</I.InsightCardList.CardsContainer>
		</I.InsightCardList.Container>
	);
};

export const InsightCardList = withSkeleton(InsightCardListComponent, InsightCardListSkeleton);
