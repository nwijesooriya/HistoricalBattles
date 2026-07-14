import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { protect, restrictToSuperAdmin } from '../middlewares/auth';

const router = Router();

// Only super_admin can register new admins
router.post('/register', protect, restrictToSuperAdmin, register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
