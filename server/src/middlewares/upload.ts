import { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';

import { ApiError } from '../utils/ApiError';

const allowedImageMimeTypes = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);
const allowedVideoMimeTypes = new Set(['video/mp4', 'video/webm']);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedImageMimeTypes.has(file.mimetype)) {
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

const videoUpload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedVideoMimeTypes.has(file.mimetype)) {
      callback(ApiError.badRequest('Only mp4 and webm videos are allowed'));
      return;
    }

    callback(null, true);
  },
});

export const singleVideoUpload = (fieldName = 'heroVideo') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    videoUpload.single(fieldName)(req, res, (error?: unknown) => {
      if (!error) {
        next();
        return;
      }

      if (error instanceof MulterError && error.code === 'LIMIT_FILE_SIZE') {
        next(ApiError.badRequest('Video file is too large. Maximum size is 100 MB'));
        return;
      }

      if (error instanceof ApiError) {
        next(error);
        return;
      }

      next(ApiError.badRequest('Invalid video upload'));
    });
  };
};