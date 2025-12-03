import { env } from 'cloudflare:workers';
import { type NextFunction, type Request, type Response } from 'express';

const proxyAuth = (req: Request, res: Response, next: NextFunction) => {
	const secret = req.headers['x-proxy-secret'];

	if (secret !== env.API_SECRET) {
		return res.status(403).json({ code: 403, messege: 'Forbidden - Direct access not allowed', success: false });
	}

	next();
};

export default proxyAuth;
