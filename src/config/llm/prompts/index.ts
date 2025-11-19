import {
  SYSTEM_PROMPT_HEARTBEAT_SONG_ANALYSIS,
  USER_PROMPT_HEARTBEAT_SONG_ANALYSIS,
} from './spotify/songs-heartrate-insight.promp';
import {
  SYSTEM_PROMPT_ACTIVITY_DESCRIPTION,
  USER_PROMPT_ACTIVITY_DESCRIPTION,
} from './strava/activity-description.prompt';
import {
  SYSTEM_PROMPT_ACTIVITY_INSIGHT,
  USER_PROMPT_ACTIVITY_INSIGHT,
} from './strava/activity-insight.promp';

export const promptsMap = {
  heartbeatSongAnalysis: {
    systemPrompt: SYSTEM_PROMPT_HEARTBEAT_SONG_ANALYSIS,
    userPrompt: USER_PROMPT_HEARTBEAT_SONG_ANALYSIS,
  },
  stravaDescription: {
    systemPrompt: SYSTEM_PROMPT_ACTIVITY_DESCRIPTION,
    userPrompt: USER_PROMPT_ACTIVITY_DESCRIPTION,
  },
  stravaInsight: {
    systemPrompt: SYSTEM_PROMPT_ACTIVITY_INSIGHT,
    userPrompt: USER_PROMPT_ACTIVITY_INSIGHT,
  },
};

export type PromptKeys = keyof typeof promptsMap;
