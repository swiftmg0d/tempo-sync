export type StreamData = {
  [key in 'heartrate' | 'cadence']: {
    original_size: number;
    resolution: 'low' | 'medium' | 'high';
    series_type: 'distance' | 'time';
    data: number[];
  };
};
