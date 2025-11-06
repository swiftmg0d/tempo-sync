import { MainError } from './main.error';

export class DatabaseError extends MainError {}
export class FetchError extends MainError {}
export class RouteNotFoundError extends MainError {}
