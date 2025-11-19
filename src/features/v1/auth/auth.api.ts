import { AxiosError } from 'axios';

import { spotifyAPI, stravaAPI } from '@/config/axios';
import {
  REDIRECT_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from '@/config/env';
import {
  SPOTFIY_TOKEN_URL,
  SPOTIFY_AUTH_HEADER,
  STRAVA_TOKEN_URL,
} from '@/constants';
import { FetchError } from '@/errors';
import { SpotifyAuthResponse, StravaAuthResponse } from '@/types/auth.type';

export const fetchSpotifyAccessToken = async (
  code: string,
): Promise<SpotifyAuthResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', REDIRECT_URL!);

    const { data } = await spotifyAPI({
      baseURL: SPOTFIY_TOKEN_URL,
      headers: { Authorization: SPOTIFY_AUTH_HEADER },
    }).post<unknown, { data: SpotifyAuthResponse }>('', params);

    return data;
  } catch (e) {
    let statusCode = undefined;
    if (e instanceof AxiosError) {
      console.error('Error response: \n', e.response?.data);
      statusCode = e.status;
    }

    throw new FetchError('Failed to fetch Spotify access token', statusCode);
  }
};

export const fetchStravaAcessToken = async (
  code: string,
): Promise<StravaAuthResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('client_id', STRAVA_CLIENT_ID!);
    params.append('client_secret', STRAVA_CLIENT_SECRET!);
    params.append('code', code!);
    params.append('grant_type', 'authorization_code');

    const { data } = await stravaAPI({ baseURL: STRAVA_TOKEN_URL }).post<
      unknown,
      { data: StravaAuthResponse }
    >('', params);

    return data;
  } catch (e) {
    let statusCode = undefined;
    if (e instanceof AxiosError) {
      console.error('Error response: \n', e.response?.data);
      statusCode = e.status;
    }
    throw new FetchError('Failed to fetch Strava access token', statusCode);
  }
};
