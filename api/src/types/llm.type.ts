export type LLMActivityInsightResponse = {
	description: string;
	title: string;
}[];

export interface LLMHeartbeatAnalysisResponse {
	heartRateInfo: string;
	joke: string;
	runTitle: string;
}

export type LLMHeartbeatSongsAnalysis = LLMHeartbeatAnalysisResponse;
