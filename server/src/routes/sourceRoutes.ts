import { Router } from 'express';
import {
  getAllSources,
  getSourceById,
  createSource,
  updateSource,
  deleteSource,
} from '../controllers/sourceController';
import { protect } from '../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAllSources);
router.get('/:id', getSourceById);

// Protected routes (admin only)
router.post('/', protect, createSource);
router.put('/:id', protect, updateSource);
router.delete('/:id', protect, deleteSource);

export default router;
