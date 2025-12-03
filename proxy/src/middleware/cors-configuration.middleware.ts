import { cors } from 'hono/cors';

const config = {
	allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Turnstile-Token'],
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	credentials: true,
	maxAge: 86400,
	origin: 'http://localhost:5173',
};

export const CorsConfiguration = () => {
	return cors(config);
};
