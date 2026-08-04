import { Router } from 'express';
import {
  getAllBattles,
  getBattleBySlug,
  getBattlesByWar,
  getBattlesByRegion,
  getBattlesByEra,
  createBattle,
  updateBattle,
  deleteBattle,
} from '../controllers/battleController';
import { protect } from '../middlewares/auth';
import { singleImageUpload } from '../middlewares/upload';

const router = Router();

// Public routes
router.get('/', getAllBattles);
router.get('/slug/:slug', getBattleBySlug);
router.get('/war/:warId', getBattlesByWar);
router.get('/region/:regionId', getBattlesByRegion);
router.get('/era/:eraId', getBattlesByEra);

// Protected routes (admin only)
router.post('/', protect, singleImageUpload('image'), createBattle);
router.put('/:id', protect, singleImageUpload('image'), updateBattle);
router.delete('/:id', protect, deleteBattle);

export default router;
