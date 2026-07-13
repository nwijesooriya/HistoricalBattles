import { Router } from 'express';
import { getAll, getBySlug, create, update, remove } from '../controllers/regionController';
import { protect } from '../middlewares/auth';

const router = Router();

// Public routes
router.get('/', getAll);
router.get('/:slug', getBySlug);

// Admin-protected routes
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

export default router;
