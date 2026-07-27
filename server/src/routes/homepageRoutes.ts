import { Router } from 'express';

import { protect } from '../middlewares/auth';
import { singleVideoUpload } from '../middlewares/upload';
import { getHomepage, updateHomepage } from '../controllers/homepageController';

const router = Router();

router.get('/', getHomepage);
router.put('/', protect, singleVideoUpload('heroVideo'), updateHomepage);

export default router;