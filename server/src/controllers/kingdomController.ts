import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { KingdomService } from '../services/kingdomService';
import { createKingdomSchema, updateKingdomSchema } from '../validations/kingdomValidation';

/**
 * @route   GET /api/v1/kingdoms
 * @desc    Get all kingdoms
 * @access  Public
 */
export const getAllKingdoms = asyncHandler(async (_req: Request, res: Response) => {
  const kingdoms = await KingdomService.getAll();

  res.status(200).json({
    success: true,
    data: kingdoms,
  });
});

/**
 * @route   GET /api/v1/kingdoms/:slug
 * @desc    Get kingdom by slug
 * @access  Public
 */
export const getKingdomBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const kingdom = await KingdomService.getBySlug(slug as string);

  res.status(200).json({
    success: true,
    data: kingdom,
  });
});

/**
 * @route   GET /api/v1/kingdoms/region/:regionId
 * @desc    Get kingdoms by region
 * @access  Public
 */
export const getKingdomsByRegion = asyncHandler(async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const kingdoms = await KingdomService.getByRegion(regionId as string);

  res.status(200).json({
    success: true,
    data: kingdoms,
  });
});

/**
 * @route   GET /api/v1/kingdoms/era/:eraId
 * @desc    Get kingdoms by era
 * @access  Public
 */
export const getKingdomsByEra = asyncHandler(async (req: Request, res: Response) => {
  const { eraId } = req.params;
  const kingdoms = await KingdomService.getByEra(eraId as string);

  res.status(200).json({
    success: true,
    data: kingdoms,
  });
});

/**
 * @route   POST /api/v1/kingdoms
 * @desc    Create a new kingdom
 * @access  Private (Admin)
 */
export const createKingdom = asyncHandler(async (req: Request, res: Response) => {
  const data = createKingdomSchema.parse(req.body);
  const kingdom = await KingdomService.create(data);

  res.status(201).json({
    success: true,
    data: kingdom,
  });
});

/**
 * @route   PUT /api/v1/kingdoms/:id
 * @desc    Update a kingdom
 * @access  Private (Admin)
 */
export const updateKingdom = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateKingdomSchema.parse(req.body);
  const kingdom = await KingdomService.update(id as string, data);

  res.status(200).json({
    success: true,
    data: kingdom,
  });
});

/**
 * @route   DELETE /api/v1/kingdoms/:id
 * @desc    Delete a kingdom
 * @access  Private (Admin)
 */
export const deleteKingdom = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await KingdomService.delete(id as string);

  res.status(200).json({
    success: true,
    message: 'Kingdom deleted successfully',
  });
});
