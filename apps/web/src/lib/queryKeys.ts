export const queryKeys = {
	athlete: {
		me: ['athlete'] as const,
		topArtist: ['athlete', 'top-artist'] as const,
		totalActivities: ['athlete', 'total-activities'] as const
	},
	sync: {
		status: ['status'] as const
	},
	activity: {
		list: ['activities'] as const,
		summary: (id: string) => [...queryKeys.activity.list, id, 'summary'] as const,
		summaries: () => [...queryKeys.activity.list, 'summaries'] as const,
		polylines: () => [...queryKeys.activity.list, 'polylines'] as const,
		LLMInsights: (id: string) => [...queryKeys.activity.list, id, 'llm-insights'] as const,
		profile: () => [...queryKeys.activity.list, 'profiles'] as const,
		streams: (id: string, streamTypes: string[]) =>
			[...queryKeys.activity.list, id, 'streams', ...streamTypes] as const,
		trackLeaderboard: (id: string) => [...queryKeys.activity.list, id, 'track-leaderboard'] as const
	},
	profile: {
		list: ['profiles'] as const
	}
} as const;
