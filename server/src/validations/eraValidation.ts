import { z } from 'zod';

export const createEraSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  startYear: z.number().int(),
  endYear: z.number().int(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  regionIds: z.array(z.string()).optional(),
});

export const updateEraSchema = createEraSchema.partial();

export type CreateEraInput = z.infer<typeof createEraSchema>;
export type UpdateEraInput = z.infer<typeof updateEraSchema>;
