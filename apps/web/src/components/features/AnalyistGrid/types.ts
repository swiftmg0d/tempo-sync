export type CardType = 'pace' | 'heartRate' | 'distance' | 'calories';

export type MetricMapType = {
	[key: number]: CardType;
};
