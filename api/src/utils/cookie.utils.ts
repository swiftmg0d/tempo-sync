import { parse, serialize } from 'cookie';
import { type Response } from 'express';
import jwt from 'jsonwebtoken';

import { COOKIE_SECRET, NODE_ENV } from '@/config/env';

export const setSessionCookie = <T>(res: Response, data: T) => {
	const token = jwt.sign(data as object | string, COOKIE_SECRET, { expiresIn: '7d' });

	res.setHeader(
		'Set-Cookie',
		serialize('session', token, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
			path: '/',
			sameSite: 'lax',
			secure: NODE_ENV === 'production',
		}),
	);
};

export const parseSessionCookie = <T>(cookieHeader: string | undefined) => {
	try {
		const cookies = parse(cookieHeader || '');
		const token = cookies['session'] || '';
		return jwt.verify(token, COOKIE_SECRET!) as T;
	} catch (e) {
		console.error('Error parsing session cookie', e);
		return null;
	}
};
