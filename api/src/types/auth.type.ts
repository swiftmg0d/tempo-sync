import { type NextFunction, type Request, type Response, Router } from 'express';

export interface Athlete {
	city: string;
	country: string;
	firstname: string;
	id: number;
	lastname: string;
	profile: string;
}

export type AuthType = 'spotify' | 'strava';

export interface Routes {
	middleware?: ((req: Request, res: Response, next: NextFunction) => void)[];
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
