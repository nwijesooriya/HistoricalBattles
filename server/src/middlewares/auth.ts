import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

/**
 * Middleware to protect routes that require admin authentication.
 * Extracts JWT from the Authorization header, verifies it, and attaches
 * the admin user to the request object.
 */
export const protect = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return next(ApiError.unauthorized('Admin not found'));
    }

    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    next();
  } catch {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
};
