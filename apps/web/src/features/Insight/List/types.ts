import type { LLMActivityInsightResponse } from '@tempo-sync/shared';

export interface InsightCardListProps {
	insights: LLMActivityInsightResponse;
	currentSlide: number;
}
