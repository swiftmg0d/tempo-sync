import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
	statusCode?: number;
}

export const errorHandler = (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
	const body = {
		message: err.message || 'Something went wrong',
		status: err.statusCode || 500,
		success: false,
	};

	const json = JSON.stringify(body);

	res
		.status(err.statusCode || 500)
		.set({ 'Content-Type': 'application/json' })
		.send(json);

	next();
};
