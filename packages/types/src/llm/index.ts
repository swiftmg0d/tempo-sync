export interface ExtractedRunData {
  elevation_gain: string;
  fastest_lap: null | string;
  gear: null | string;
  interval_structure: null | string;
  is_solo: boolean;
  notable_moment: null | string;
  pace_range: null | string;
  pacing_pattern: string;
  run_type: string;
  slowest_lap: null | string;
  terrain: string;
  time_of_day: string;
}

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

export interface LLMEnv {
  GEMINI_API_KEY: string;
  GROQ_API_KEY: string;
  OPENROUTER_API_KEY: string;
}
