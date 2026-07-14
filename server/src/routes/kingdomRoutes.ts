import { Router } from 'express';
import {
  getAllKingdoms,
  getKingdomBySlug,
  getKingdomsByRegion,
  getKingdomsByEra,
  createKingdom,
  updateKingdom,
  deleteKingdom,
} from '../controllers/kingdomController';
import { protect } from '../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllKingdoms);
router.get('/slug/:slug', getKingdomBySlug);
router.get('/region/:regionId', getKingdomsByRegion);
router.get('/era/:eraId', getKingdomsByEra);

// Protected routes (admin only)
router.post('/', protect, createKingdom);
router.put('/:id', protect, updateKingdom);
router.delete('/:id', protect, deleteKingdom);

export default router;
