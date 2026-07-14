import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { WeaponService } from '../services/weaponService';
import { createWeaponSchema, updateWeaponSchema } from '../validations/weaponValidation';

/**
 * @route   GET /api/v1/weapons
 * @desc    Get all weapons
 * @access  Public
 */
export const getAllWeapons = asyncHandler(async (_req: Request, res: Response) => {
  const weapons = await WeaponService.getAll();

  res.status(200).json({
    success: true,
    data: weapons,
  });
});

/**
 * @route   GET /api/v1/weapons/:slug
 * @desc    Get weapon by slug
 * @access  Public
 */
export const getWeaponBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const weapon = await WeaponService.getBySlug(slug as string);

  res.status(200).json({
    success: true,
    data: weapon,
  });
});

/**
 * @route   GET /api/v1/weapons/era/:eraId
 * @desc    Get weapons by era
 * @access  Public
 */
export const getWeaponsByEra = asyncHandler(async (req: Request, res: Response) => {
  const { eraId } = req.params;
  const weapons = await WeaponService.getByEra(eraId as string);

  res.status(200).json({
    success: true,
    data: weapons,
  });
});

/**
 * @route   POST /api/v1/weapons
 * @desc    Create a new weapon
 * @access  Private (Admin)
 */
export const createWeapon = asyncHandler(async (req: Request, res: Response) => {
  const data = createWeaponSchema.parse(req.body);
  const weapon = await WeaponService.create(data);

  res.status(201).json({
    success: true,
    data: weapon,
  });
});

/**
 * @route   PUT /api/v1/weapons/:id
 * @desc    Update a weapon
 * @access  Private (Admin)
 */
export const updateWeapon = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = updateWeaponSchema.parse(req.body);
  const weapon = await WeaponService.update(id as string, data);

  res.status(200).json({
    success: true,
    data: weapon,
  });
});

/**
 * @route   DELETE /api/v1/weapons/:id
 * @desc    Delete a weapon
 * @access  Private (Admin)
 */
export const deleteWeapon = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await WeaponService.delete(id as string);

  res.status(200).json({
    success: true,
    message: 'Weapon deleted successfully',
  });
});
