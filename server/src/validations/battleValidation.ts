import { z } from 'zod';

export const createBattleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  warId: z.string().min(1, 'War is required'),
  regionId: z.string().min(1, 'Region is required'),
  eraId: z.string().min(1, 'Era is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  outcome: z.string().min(1, 'Outcome is required'),
  casualties: z.string().optional(),
  image: z.string().optional(),
});

export const updateBattleSchema = createBattleSchema.partial();

export type CreateBattleInput = z.infer<typeof createBattleSchema>;
export type UpdateBattleInput = z.infer<typeof updateBattleSchema>;
