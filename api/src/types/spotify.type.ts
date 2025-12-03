export interface RecentlyPlayedSongsProperties {
	accessToken: string;
	bound: {
		type: 'after' | 'before';
		value: number;
	};
	limit: number;
}
