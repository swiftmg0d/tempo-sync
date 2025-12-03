import { type Context, type Next } from 'hono';

import { verifyTurnstile } from '@/utils';

export const turnstileValidation = async (c: Context, next: Next) => {
	const token = c.req.header('x-turnstile-token');

	if (!token) {
		return c.json({ code: 'NO_TOKEN', error: 'Token required' }, 403);
	}

	const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for');

	const isValid = await verifyTurnstile(token, ip);

	if (!isValid) {
		return c.json({ code: 'INVALID_TOKEN', error: 'Invalid token' }, 403);
	}

	await next();
};
