import { decode } from '@mapbox/polyline';

export const decodeActivityMap = (polyline: null | string) => {
  return polyline ? decode(polyline) : null;
};
