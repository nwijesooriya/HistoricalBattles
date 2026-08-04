import { Router } from 'express';
import {
  getAllWars,
  getWarBySlug,
  getWarsByRegion,
  getWarsByEra,
  createWar,
  updateWar,
  deleteWar,
} from '../controllers/warController';
import { protect } from '../middlewares/auth';
import { singleImageUpload } from '../middlewares/upload';

const router = Router();

// Public routes
router.get('/', getAllWars);
router.get('/slug/:slug', getWarBySlug);
router.get('/region/:regionId', getWarsByRegion);
router.get('/era/:eraId', getWarsByEra);

// Protected routes (admin only)
router.post('/', protect, singleImageUpload('image'), createWar);
router.put('/:id', protect, singleImageUpload('image'), updateWar);
router.delete('/:id', protect, deleteWar);

export default router;
