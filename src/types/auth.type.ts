export interface Athlete {
  city: string;
  country: string;
  firstname: string;
  id: number;
  lastname: string;
}

export type AuthType = 'spotify' | 'strava';

export interface SpotifyAuthResponse extends TokenResponse {
  scope: string;
}

export interface StravaAuthResponse extends TokenResponse {
  athlete: Athlete;
  expires_at: number;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
