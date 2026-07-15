import { z } from 'zod';

export const createKingdomSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  regionId: z.string().min(1, 'Region is required'),
  eraId: z.string().min(1, 'Era is required'),
  startYear: z.number().int('Start year must be an integer'),
  endYear: z.number().int('End year must be an integer'),
  image: z.string().optional(),
});

export const updateKingdomSchema = createKingdomSchema.partial();

export type CreateKingdomInput = z.infer<typeof createKingdomSchema>;
export type UpdateKingdomInput = z.infer<typeof updateKingdomSchema>;
