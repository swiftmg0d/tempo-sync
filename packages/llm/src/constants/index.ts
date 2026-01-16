import { activityInsightPrompts, activityDescriptionPrompts } from '../prompts/strava';

export const promptsMap = {
  stravaDescription: activityDescriptionPrompts,
  stravaInsight: activityInsightPrompts,
};

export type PromptKeys = keyof typeof promptsMap;
