import { Request, Response, NextFunction } from 'express';

/**
 * Wraps an async Express route handler to catch rejected promises
 * and forward them to the global error handler.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
