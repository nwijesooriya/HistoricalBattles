import { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';

import { ApiError } from '../utils/ApiError';

const allowedMimeTypes = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(ApiError.badRequest('Only jpg, jpeg, png, and webp images are allowed'));
      return;
    }

    callback(null, true);
  },
});

export const singleImageUpload = (fieldName = 'image') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    upload.single(fieldName)(req, res, (error?: unknown) => {
      if (!error) {
        next();
        return;
      }

      if (error instanceof MulterError && error.code === 'LIMIT_FILE_SIZE') {
        next(ApiError.badRequest('Image file is too large. Maximum size is 10 MB'));
        return;
      }

      if (error instanceof ApiError) {
        next(error);
        return;
      }

      next(ApiError.badRequest('Invalid image upload'));
    });
  };
};