import { NextFunction, Request, Response } from 'express';

import { X_API_KEY } from '@/config/env';
import { success } from 'zod';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers['x-api-key'];

	if (apiKey && apiKey === X_API_KEY) next();

	return res.status(403).json({ message: 'Forbidden: Invalid API Key', success: false, code: 403 });
};
