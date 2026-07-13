import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { RegionService } from '../services/regionService';
import { createRegionSchema, updateRegionSchema } from '../validations/regionValidation';

/**
 * @route   GET /api/v1/regions
 * @desc    Get all regions
 * @access  Public
 */
export const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const regions = await RegionService.getAll();

  res.status(200).json({
    success: true,
    count: regions.length,
    data: regions,
  });
});

/**
 * @route   GET /api/v1/regions/:slug
 * @desc    Get a region by slug
 * @access  Public
 */
export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const region = await RegionService.getBySlug(req.params.slug);

  res.status(200).json({
    success: true,
    data: region,
  });
});

/**
 * @route   POST /api/v1/regions
 * @desc    Create a new region
 * @access  Admin
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = createRegionSchema.parse(req.body);
  const region = await RegionService.create(data);

  res.status(201).json({
    success: true,
    data: region,
  });
});

/**
 * @route   PUT /api/v1/regions/:id
 * @desc    Update a region
 * @access  Admin
 */
export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = updateRegionSchema.parse(req.body);
  const region = await RegionService.update(req.params.id, data);

  res.status(200).json({
    success: true,
    data: region,
  });
});

/**
 * @route   DELETE /api/v1/regions/:id
 * @desc    Delete a region
 * @access  Admin
 */
export const remove = asyncHandler(async (req: Request, res: Response) => {
  await RegionService.delete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Region deleted successfully',
  });
});
