import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { EraService } from '../services/eraService';
import { createEraSchema, updateEraSchema } from '../validations/eraValidation';

/**
 * @route   GET /api/v1/eras
 * @desc    Get all eras
 * @access  Public
 */
export const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const eras = await EraService.getAll();

  res.status(200).json({
    success: true,
    count: eras.length,
    data: eras,
  });
});

/**
 * @route   GET /api/v1/eras/:slug
 * @desc    Get an era by slug
 * @access  Public
 */
export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const era = await EraService.getBySlug(req.params.slug);

  res.status(200).json({
    success: true,
    data: era,
  });
});

/**
 * @route   GET /api/v1/eras/region/:regionId
 * @desc    Get eras for a specific region
 * @access  Public
 */
export const getByRegion = asyncHandler(async (req: Request, res: Response) => {
  const eras = await EraService.getByRegion(req.params.regionId);

  res.status(200).json({
    success: true,
    count: eras.length,
    data: eras,
  });
});

/**
 * @route   POST /api/v1/eras
 * @desc    Create a new era
 * @access  Admin
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = createEraSchema.parse(req.body);
  const era = await EraService.create(data);

  res.status(201).json({
    success: true,
    data: era,
  });
});

/**
 * @route   PUT /api/v1/eras/:id
 * @desc    Update an era
 * @access  Admin
 */
export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = updateEraSchema.parse(req.body);
  const era = await EraService.update(req.params.id, data);

  res.status(200).json({
    success: true,
    data: era,
  });
});

/**
 * @route   DELETE /api/v1/eras/:id
 * @desc    Delete an era
 * @access  Admin
 */
export const remove = asyncHandler(async (req: Request, res: Response) => {
  await EraService.delete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Era deleted successfully',
  });
});
