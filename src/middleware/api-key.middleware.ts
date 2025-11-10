import { NextFunction, Request, Response } from 'express';

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey && apiKey === process.env.X_API_KEY) next();

  return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
};
