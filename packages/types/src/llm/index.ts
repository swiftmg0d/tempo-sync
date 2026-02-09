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

export interface TrackLeaderboardEntry {
  trackName: string;
  artist: string;
  score: number;
  bpm: number;
  insightLabel: string;
  insightDescription: string;
  trackId?: string;
  image?: string;
}

export type TrackLeaderboardResponse = TrackLeaderboardEntry[];

export interface RecommendedTrackArtist {
  id: string;
  name: string;
  href: string;
}

export interface RecommendedTrack {
  id: string;
  trackTitle: string;
  artists: RecommendedTrackArtist[];
  durationMs: number;
  isrc: string;
  ean: string | null;
  upc: string | null;
  href: string;
  availableCountries: string;
  popularity: number;
  image: string;
}

export type TrackRecommendationsResponse = RecommendedTrack[];

export interface PaginatedTrackRecommendations {
  recommendations: RecommendedTrack[];
  pagination: {
    hasMore: boolean;
    nextPage: number | null;
    page: number;
    total: number;
  };
}

export interface LLMEnv {
  GEMINI_API_KEY: string;
  GROQ_API_KEY: string;
  OPENROUTER_API_KEY: string;
  CEREBRAS_API_KEY: string;
  SAMBANOVA_API_KEY: string;
}
