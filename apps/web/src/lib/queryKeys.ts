export const queryKeys = {
	athlete: {
		me: ['athlete'] as const
	},
	sync: {
		status: ['status'] as const
	},
	activity: {
		list: ['activities'] as const,
		summary: (id: string) => [...queryKeys.activity.list, id, 'summary'] as const,
		summaries: () => [...queryKeys.activity.list, 'summaries'] as const
	}
} as const;
