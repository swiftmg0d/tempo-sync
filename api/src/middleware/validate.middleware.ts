import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

import { ValidationError } from './../errors/index';

export const validate = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse({
			body: req.body,
			params: req.params,
			query: req.query,
		});

		if (!result.success) {
			const errorMessages = result.error.issues.map((issue) => issue.message).join(',\n');

			throw new ValidationError(errorMessages, 400);
		}

		next();
	};
};
