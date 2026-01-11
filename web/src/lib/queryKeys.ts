export const queryKeys = {
	athlete: {
		me: ['athlete'] as const
	},
	sync: {
		state: ['state'] as const
	},
	activity: {
		list: ['activities'] as const,
		summary: (id: number) => [...queryKeys.activity.list, id, 'summary'] as const,
		summaries: () => [...queryKeys.activity.list, 'summaries'] as const
	}
} as const;
