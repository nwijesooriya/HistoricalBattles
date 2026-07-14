import { Router } from 'express';
import {
  getAllWeapons,
  getWeaponBySlug,
  getWeaponsByEra,
  createWeapon,
  updateWeapon,
  deleteWeapon,
} from '../controllers/weaponController';
import { protect } from '../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllWeapons);
router.get('/slug/:slug', getWeaponBySlug);
router.get('/era/:eraId', getWeaponsByEra);

// Protected routes (admin only)
router.post('/', protect, createWeapon);
router.put('/:id', protect, updateWeapon);
router.delete('/:id', protect, deleteWeapon);

export default router;
