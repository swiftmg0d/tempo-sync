export type StreamData = {
  [key in 'heartrate' | 'cadence' | 'velocity_smooth']: {
    original_size: number;
    resolution: 'low' | 'medium' | 'high';
    series_type: 'distance' | 'time';
    data: number[];
  };
};
