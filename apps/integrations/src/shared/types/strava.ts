export type StreamData = Record<
  'heartrate' | 'cadence' | 'velocity_smooth',
  {
    original_size: number;
    resolution: 'low' | 'medium' | 'high';
    series_type: 'distance' | 'time';
    data: number[];
  }
>;
