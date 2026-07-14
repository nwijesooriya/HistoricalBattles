import { Router } from 'express';
import {
  getAllCommanders,
  getCommanderBySlug,
  createCommander,
  updateCommander,
  deleteCommander,
} from '../controllers/commanderController';
import { protect } from '../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllCommanders);
router.get('/slug/:slug', getCommanderBySlug);

// Protected routes (admin only)
router.post('/', protect, createCommander);
router.put('/:id', protect, updateCommander);
router.delete('/:id', protect, deleteCommander);

export default router;
