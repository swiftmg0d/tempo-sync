import { decode } from '@mapbox/polyline';

export const decodeActivityMap = (polyline: null | string) => {
  if (!polyline) return null;

  return decode(polyline).map(([lat, lng]) => [lng, lat]);
};
