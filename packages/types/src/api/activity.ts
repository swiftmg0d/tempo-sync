export interface Pagination {
  hasMore: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  total: number;
}

export interface Activity {
  id: string;
  title: string;
  date: Date;
  polyline: number[][] | null;
  time: number;
  totalElevationGain: number | null;
  lastTrack: {
    name: string;
    image: string | null;
  } | null;
}

export interface Activities {
  activities: Activity[];
  pagination: Pagination;
}
export interface Athlete {
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

export interface ActivitySummary {
  id: string;
  title: string;
  avgPace: string;
  avgHr: number | null;
  distance: number;
  calories: number | null;
  date: Date;
  deviceName: string | null;
  gear: string | null;
}

export interface ActivitySummaryStats {
  id: string;
  icon: string;
  title: string;
  value: number;
  info: string;
  label?: string;
}
