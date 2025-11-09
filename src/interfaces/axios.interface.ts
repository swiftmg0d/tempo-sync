import { AxiosHeaders, HeadersDefaults, RawAxiosRequestHeaders } from 'axios';

export type SpotifyAPIProperties = CustomAxiosProperties;

export type StravaAPIProperties = CustomAxiosProperties;

interface CustomAxiosProperties {
  baseURL?: string;
  headers?: AxiosHeaders | Partial<HeadersDefaults> | RawAxiosRequestHeaders;
  token?: string;
}
