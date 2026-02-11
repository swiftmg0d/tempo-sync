import { Box, useBreakpointValue } from '@chakra-ui/react';
import { Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { InsightCardList } from '../List/InsightCardList';

import * as I from './InsightCarousel.styled';

import { HighlightsTicker } from '@/components/HighlightsTicker/HighlightsTicker';
import { Queries } from '@/hooks/quieries';
import { useActivityCardsStore } from '@/store';
import { theme } from '@/styles';

export const InsightCarousel = ({ flex }: { flex?: number }) => {
	const activityId = useActivityCardsStore((state) => state.activityId);
	const { isLoading, data } = Queries.useLLMActivityInsights(activityId ?? '')();
	const { data: highlights } = Queries.useActivityHighlights(activityId ?? '')();

	const [currentSlide, setCurrentSlide] = useState(0);

	const totalSlides =
		useBreakpointValue({
			base: data?.length ?? 0,
			md: Math.ceil((data?.length ?? 0) / 2) + ((data?.length ?? 0) % 2)
		}) ?? 0;

	const handleNext = () => {
		if (totalSlides <= 1) return;
		setCurrentSlide((prev) => (prev + 1) % totalSlides);
	};

	const handlePrev = () => {
		if (totalSlides <= 1) return;
		setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
	};

	return (
		<I.InsightCarousel.Container $flex={flex}>
			<I.InsightCarousel.HeaderSection>
				<Bot color={theme.colors.bg.teal} />
				<I.InsightCarousel.HeaderTitle>LLM Performance Insights</I.InsightCarousel.HeaderTitle>
				<Box marginLeft='auto' display='flex' flexDirection='row' alignItems='center' gap='8px'>
					<ChevronLeft color={theme.colors.icon.primary} cursor='pointer' onClick={handlePrev} />
					<ChevronRight color={theme.colors.icon.primary} cursor='pointer' onClick={handleNext} />
				</Box>
			</I.InsightCarousel.HeaderSection>
			<InsightCardList insights={data ?? []} isLoading={isLoading} currentSlide={currentSlide} />
			<I.InsightCarousel.DotsContainer>
				{Array.from({ length: totalSlides }).map((_, index) => (
					<I.InsightCarousel.Dot
						key={`dot-${crypto.randomUUID()}`}
						isActive={index === currentSlide}
						onClick={() => {
							setCurrentSlide(index);
						}}
						isFirst={index === 0}
					/>
				))}
			</I.InsightCarousel.DotsContainer>
			<HighlightsTicker data={highlights} />
		</I.InsightCarousel.Container>
	);
};
