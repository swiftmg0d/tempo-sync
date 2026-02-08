import {
  activityInsightPrompts,
  activityDescriptionPrompts,
  trackLeaderboardPrompts,
} from '../prompts/strava';

export const promptsMap = {
  stravaDescription: activityDescriptionPrompts,
  stravaInsight: activityInsightPrompts,
  stravaTrackLeaderboard: trackLeaderboardPrompts,
};

export type PromptKeys = keyof typeof promptsMap;
