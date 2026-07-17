import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

/**
 * Global error handler middleware.
 * Catches all errors thrown in route handlers and returns a structured JSON response.
 */
export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  // Custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Zod validation error
  else if ((err as any).name === 'ZodError' || (err as any).issues) {
    statusCode = 400;
    const issues = (err as any).issues || (err as any).errors;
    message = issues?.[0]?.message || 'Validation failed';
  }
  // Mongoose validation error
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }
  // Mongoose duplicate key error
  else if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyValue || {})[0];
    message = `Duplicate value for field: ${field}`;
  }
  // Mongoose cast error (invalid ObjectId)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }
  // JWT errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Log error in development
  if (env.NODE_ENV === 'development') {
    console.error('❌ Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

