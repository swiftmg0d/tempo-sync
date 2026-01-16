export type ActivityStream = Partial<
  Record<
    streamKeys,
    {
      data: number[];
      original_size: number;
      resolution: 'high' | 'high' | 'medium';
      series_type: 'distance' | 'time';
    }
  >
>;

export interface Effort {
  elapsed_time: number;
  end_index: number;
  id: bigint;
  moving_time: number;
  name: string;
  start_index: number;
}

export interface Gear {
  converted_distance: number;
  distance: number;
  id: string;
  name: string;
  primary: boolean;
  retired: boolean;
}

export interface Lap {
  average_cadence: number;
  average_heartrate: number;
  average_speed: number;
  distance: number;
  elapsed_time: number;
  end_index: number;
  id: bigint;
  lap_index: number;
  max_heartrate: number;
  max_speed: number;
  moving_time: number;
  name: string;
  pace_zone: number;
  split: number;
  start_index: number;
  total_elevation_gain: number;
}

export type SplitMetric = Split;

export type SplitStandard = Split;

export interface StravaActivity {
  athlete: Athlete;
  athlete_count: number;
  average_cadence: number;
  average_heartrate: number;
  average_speed: number;
  best_efforts: Effort[];
  calories: number;
  description: string;
  device_name: string;
  distance: number;
  elapsed_time: number;
  elev_high: number;
  elev_low: number;
  end_latlng: [number, number];
  gear: Gear;
  has_heartrate: boolean;
  id: number;
  laps: Lap[];
  map: ActivityMap;
  max_heartrate: number;
  max_speed: number;
  moving_time: number;
  name: string;
  splits_metric: SplitMetric[];
  splits_standard: SplitStandard[];
  start_date: string;
  start_date_local: string;
  start_latlng: [number, number];
  total_elevation_gain: number;
  type: string;
}

export type streamKeys =
  | 'altitude'
  | 'cadence'
  | 'distance'
  | 'grade_smooth'
  | 'heartrate'
  | 'latlng'
  | 'moving'
  | 'temp'
  | 'time'
  | 'velocity_smooth'
  | 'watts';

interface ActivityMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}

interface Athlete {
  id: number;
}

interface Split {
  average_grade_adjusted_speed: number;
  average_heartrate: number;
  average_speed: number;
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  pace_zone: number;
  split: number;
}
