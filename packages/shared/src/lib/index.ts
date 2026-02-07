import { decode } from '@mapbox/polyline';
import { Hono, type Env } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { FetchError } from '../errors';

export const createRouter = <T extends Env>() => new Hono<T>();

export async function http<T>(
  url: string,
  options?: RequestInit,
  customErrorMsg?: string
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    console.error('Fetch error:', {
      url,
      status: response.status,
      statusText: response.statusText,
      options,
      text: await response.text(),
    });

    throw new FetchError(
      response.status as ContentfulStatusCode,
      customErrorMsg ?? response.statusText
    );
  }
  return response.json();
}

export const decodeActivityMap = (polyline: null | string) => {
  if (!polyline) return null;

  return decode(polyline).map(([lat, lng]) => [lng, lat]);
};
