import { z } from 'zod';

export const createCommanderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  birthYear: z.number().int('Birth year must be an integer'),
  deathYear: z.number().int('Death year must be an integer'),
  nationality: z.string().min(1, 'Nationality is required'),
  image: z.string().optional(),
});

export const updateCommanderSchema = createCommanderSchema.partial();

export type CreateCommanderInput = z.infer<typeof createCommanderSchema>;
export type UpdateCommanderInput = z.infer<typeof updateCommanderSchema>;
