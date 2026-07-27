import { Request, Response } from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import { HomepageService } from '../services/homepageService';

const parseHomepagePayload = (payload: unknown) => {
  if (typeof payload === 'string' && payload.trim()) {
    return JSON.parse(payload);
  }

  if (payload && typeof payload === 'object') {
    return payload;
  }

  return {};
};

export const getHomepage = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await HomepageService.getSettings();

  res.status(200).json({
    success: true,
    data: settings,
  });
});

export const updateHomepage = asyncHandler(async (req: Request, res: Response) => {
  const payload = parseHomepagePayload(req.body.payload ?? req.body.settings ?? req.body);
  const settings = await HomepageService.updateSettings(payload, req.file);

  res.status(200).json({
    success: true,
    data: settings,
    message: 'Homepage settings updated successfully',
  });
});