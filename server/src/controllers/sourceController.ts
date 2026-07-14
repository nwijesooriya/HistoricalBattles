import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { SourceService } from '../services/sourceService';
import { createSourceSchema, updateSourceSchema } from '../validations/sourceValidation';

/**
 * @route   GET /api/v1/sources
 * @desc    Get all sources
 * @access  Public
 */
export const getAllSources = asyncHandler(async (_req: Request, res: Response) => {
  const sources = await SourceService.getAll();

  res.status(200).json({
    success: true,
    data: sources,
  });
});

/**
 * @route   GET /api/v1/sources/:id
 * @desc    Get source by id
 * @access  Public
 */
export const getSourceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const source = await SourceService.getById(id as string);

  res.status(200).json({
    success: true,
    data: source,
  });
});

/**
 * @route   POST /api/v1/sources
 * @desc    Create a new source
 * @access  Private (Admin)
 */
export const createSource = asyncHandler(async (req: Request, res: Response) => {
  const data = createSourceSchema.parse(req.body);
  const source = await SourceService.create(data);

  res.status(201).json({
    success: true,
    data: source,
  });
});

/**
 * @route   PUT /api/v1/sources/:id
 * @desc    Update a source
 * @access  Private (Admin)
 */
export const updateSource = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateSourceSchema.parse(req.body);
  const source = await SourceService.update(id as string, data);

  res.status(200).json({
    success: true,
    data: source,
  });
});

/**
 * @route   DELETE /api/v1/sources/:id
 * @desc    Delete a source
 * @access  Private (Admin)
 */
export const deleteSource = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await SourceService.delete(id as string);

  res.status(200).json({
    success: true,
    message: 'Source deleted successfully',
  });
});
