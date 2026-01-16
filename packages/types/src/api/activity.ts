export type Pagination = {
  hasMore: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  total: number;
};

export type Activity = {
  id: string;
  title: string;
  date: Date;
  polyline: [number, number][] | null;
  time: number;
};

export type Activities = {
  activities: Activity[];
  pagination: Pagination;
};
export type Athlete = {
  firstName: string;
  lastName: string;
  profilePhoto: string;
};

export type ActivitySummary = {
  id: string;
  title: string;
  avgPace: number;
  avgHr: number | null;
  distance: number;
  calories: number | null;
};

export type ActivitySummaryStats = {
  id: string;
  icon: string;
  title: string;
  value: number;
  info: string;
  label?: string;
};
