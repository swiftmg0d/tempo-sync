import { Router } from 'express';

export interface Athlete {
  city: string;
  country: string;
  firstname: string;
  id: number;
  lastname: string;
}

export type AuthType = 'spotify' | 'strava';

export interface Routes {
  path: string;
  route: Router;
}

export interface SpotifyAuthResponse extends TokenResponse {
  refresh_token: string;
  scope: string;
}

export interface StravaAuthResponse extends TokenResponse {
  athlete: Athlete;
  expires_at: number;
  refresh_token: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
}
