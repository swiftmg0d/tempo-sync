export interface Athlete {
  city: string;
  country: string;
  firstname: string;
  id: number;
  lastname: string;
  profile: string;
}

export interface ClientCredentials {
  client_id: string;
  client_secret: string;
}

export interface StravaTokenRequestParams extends ClientCredentials {
  code: string;
  grant_type: string;
}
export interface SpotifyTokenRequestParams extends StravaTokenRequestParams {
  redirect_uri: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
}

export interface StravaTokenResponse extends TokenResponse {
  athlete: Athlete;
  expires_at: number;
  refresh_token: string;
}

export interface SpotifyTokenResponse extends TokenResponse {
  refresh_token: string;
  scope: string;
}

export interface RefreshTokenRequestParams extends ClientCredentials {
  grant_type: 'refresh_token';
  refresh_token: string;
}

export interface CombinedRefreshTokensRequestParams extends ClientCredentials {
  strava_client_id: string;
  strava_client_secret: string;
  grant_type: 'refresh_token';
  key: string;
}
