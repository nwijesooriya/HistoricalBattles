import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthService } from '../services/authService';
import { loginSchema, registerSchema } from '../validations/authValidation';
import { AuthRequest } from '../middlewares/auth';

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new admin
 * @access  Public (first admin) / Protected (subsequent)
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const result = await AuthService.register(data);

  res.status(201).json({
    success: true,
    data: result,
  });
});

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate admin & get token
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await AuthService.login(data);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current logged-in admin
 * @access  Protected
 */
export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const admin = await AuthService.getById(req.admin!.id);

  res.status(200).json({
    success: true,
    data: admin,
  });
});
