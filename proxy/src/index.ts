import { OriginAccess } from './middleware/origin-access.middleware';
import { env } from 'cloudflare:workers';
import { Hono } from 'hono';

import { CorsConfiguration } from './middleware/cors-configuration.middleware';
import { turnstileValidation } from './middleware/turnstile-validation.middleware';

interface Env {
	API: Fetcher;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', CorsConfiguration());

app.all('/api/**', OriginAccess, turnstileValidation, async (c) => {
	const newPath = c.req.path.replace(/^\/api/, '/v1/api');
	const url = new URL(newPath + new URL(c.req.url).search, c.req.url);

	const headers = new Headers(c.req.raw.headers);

	headers.set('X-Forwarded-By', 'tempo-sync-proxy');
	headers.set('X-Proxy-Secret', env.API_SECRET);

	return c.env.API.fetch(
		new Request(url, {
			body: c.req.raw.body,
			headers,
			method: c.req.method,
		})
	);
});

app.get('/health', (c) => c.json({ message: 'Proxy running!' }));

export default app;
