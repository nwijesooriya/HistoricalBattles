import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { WarService } from '../services/warService';
import { createWarSchema, updateWarSchema } from '../validations/warValidation';

/**
 * @route   GET /api/v1/wars
 * @desc    Get all wars
 * @access  Public
 */
export const getAllWars = asyncHandler(async (_req: Request, res: Response) => {
  const wars = await WarService.getAll();

  res.status(200).json({
    success: true,
    data: wars,
  });
});

/**
 * @route   GET /api/v1/wars/:slug
 * @desc    Get war by slug
 * @access  Public
 */
export const getWarBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const war = await WarService.getBySlug(slug as string);

  res.status(200).json({
    success: true,
    data: war,
  });
});

/**
 * @route   GET /api/v1/wars/region/:regionId
 * @desc    Get wars by region
 * @access  Public
 */
export const getWarsByRegion = asyncHandler(async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const wars = await WarService.getByRegion(regionId as string);

  res.status(200).json({
    success: true,
    data: wars,
  });
});

/**
 * @route   GET /api/v1/wars/era/:eraId
 * @desc    Get wars by era
 * @access  Public
 */
export const getWarsByEra = asyncHandler(async (req: Request, res: Response) => {
  const { eraId } = req.params;
  const wars = await WarService.getByEra(eraId as string);

  res.status(200).json({
    success: true,
    data: wars,
  });
});

/**
 * @route   POST /api/v1/wars
 * @desc    Create a new war
 * @access  Private (Admin)
 */
export const createWar = asyncHandler(async (req: Request, res: Response) => {
  const data = createWarSchema.parse(req.body);
  const war = await WarService.create(data);

  res.status(201).json({
    success: true,
    data: war,
  });
});

/**
 * @route   PUT /api/v1/wars/:id
 * @desc    Update a war
 * @access  Private (Admin)
 */
export const updateWar = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateWarSchema.parse(req.body);
  const war = await WarService.update(id as string, data);

  res.status(200).json({
    success: true,
    data: war,
  });
});

/**
 * @route   DELETE /api/v1/wars/:id
 * @desc    Delete a war
 * @access  Private (Admin)
 */
export const deleteWar = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await WarService.delete(id as string);

  res.status(200).json({
    success: true,
    message: 'War deleted successfully',
  });
});
