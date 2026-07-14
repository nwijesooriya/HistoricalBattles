import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { CommanderService } from '../services/commanderService';
import { createCommanderSchema, updateCommanderSchema } from '../validations/commanderValidation';

/**
 * @route   GET /api/v1/commanders
 * @desc    Get all commanders
 * @access  Public
 */
export const getAllCommanders = asyncHandler(async (_req: Request, res: Response) => {
  const commanders = await CommanderService.getAll();

  res.status(200).json({
    success: true,
    data: commanders,
  });
});

/**
 * @route   GET /api/v1/commanders/:slug
 * @desc    Get commander by slug
 * @access  Public
 */
export const getCommanderBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const commander = await CommanderService.getBySlug(slug as string);

  res.status(200).json({
    success: true,
    data: commander,
  });
});

/**
 * @route   POST /api/v1/commanders
 * @desc    Create a new commander
 * @access  Private (Admin)
 */
export const createCommander = asyncHandler(async (req: Request, res: Response) => {
  const data = createCommanderSchema.parse(req.body);
  const commander = await CommanderService.create(data);

  res.status(201).json({
    success: true,
    data: commander,
  });
});

/**
 * @route   PUT /api/v1/commanders/:id
 * @desc    Update a commander
 * @access  Private (Admin)
 */
export const updateCommander = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateCommanderSchema.parse(req.body);
  const commander = await CommanderService.update(id as string, data);

  res.status(200).json({
    success: true,
    data: commander,
  });
});

/**
 * @route   DELETE /api/v1/commanders/:id
 * @desc    Delete a commander
 * @access  Private (Admin)
 */
export const deleteCommander = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await CommanderService.delete(id as string);

  res.status(200).json({
    success: true,
    message: 'Commander deleted successfully',
  });
});
