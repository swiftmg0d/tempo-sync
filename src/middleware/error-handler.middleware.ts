import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error:', err.message);

  const status = err?.statusCode || 500;
  res.status(status).json({
    message: err.message,
    status: status,
    success: false,
  });
  next();
};
