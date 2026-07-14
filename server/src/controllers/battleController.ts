import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { BattleService } from '../services/battleService';
import { createBattleSchema, updateBattleSchema } from '../validations/battleValidation';

/**
 * @route   GET /api/v1/battles
 * @desc    Get all battles
 * @access  Public
 */
export const getAllBattles = asyncHandler(async (_req: Request, res: Response) => {
  const battles = await BattleService.getAll();

  res.status(200).json({
    success: true,
    data: battles,
  });
});

/**
 * @route   GET /api/v1/battles/:slug
 * @desc    Get battle by slug
 * @access  Public
 */
export const getBattleBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const battle = await BattleService.getBySlug(slug as string);

  res.status(200).json({
    success: true,
    data: battle,
  });
});

/**
 * @route   GET /api/v1/battles/war/:warId
 * @desc    Get battles by war
 * @access  Public
 */
export const getBattlesByWar = asyncHandler(async (req: Request, res: Response) => {
  const { warId } = req.params;
  const battles = await BattleService.getByWar(warId as string);

  res.status(200).json({
    success: true,
    data: battles,
  });
});

/**
 * @route   GET /api/v1/battles/region/:regionId
 * @desc    Get battles by region
 * @access  Public
 */
export const getBattlesByRegion = asyncHandler(async (req: Request, res: Response) => {
  const { regionId } = req.params;
  const battles = await BattleService.getByRegion(regionId as string);

  res.status(200).json({
    success: true,
    data: battles,
  });
});

/**
 * @route   GET /api/v1/battles/era/:eraId
 * @desc    Get battles by era
 * @access  Public
 */
export const getBattlesByEra = asyncHandler(async (req: Request, res: Response) => {
  const { eraId } = req.params;
  const battles = await BattleService.getByEra(eraId as string);

  res.status(200).json({
    success: true,
    data: battles,
  });
});

/**
 * @route   POST /api/v1/battles
 * @desc    Create a new battle
 * @access  Private (Admin)
 */
export const createBattle = asyncHandler(async (req: Request, res: Response) => {
  const data = createBattleSchema.parse(req.body);
  const battle = await BattleService.create(data);

  res.status(201).json({
    success: true,
    data: battle,
  });
});

/**
 * @route   PUT /api/v1/battles/:id
 * @desc    Update a battle
 * @access  Private (Admin)
 */
export const updateBattle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateBattleSchema.parse(req.body);
  const battle = await BattleService.update(id as string, data);

  res.status(200).json({
    success: true,
    data: battle,
  });
});

/**
 * @route   DELETE /api/v1/battles/:id
 * @desc    Delete a battle
 * @access  Private (Admin)
 */
export const deleteBattle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await BattleService.delete(id as string);

  res.status(200).json({
    success: true,
    message: 'Battle deleted successfully',
  });
});
