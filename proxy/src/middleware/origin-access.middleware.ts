import { type Context, type Next } from 'hono';

export const OriginAccess = async (c: Context, next: Next) => {
	const origin = c.req.header('origin');

	if (!origin) {
		return c.json({ code: 403, message: 'Direct access not allowed', success: false }, 403);
	}

	await next();
};
