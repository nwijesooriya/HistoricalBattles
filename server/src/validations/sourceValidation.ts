import { z } from 'zod';

export const createSourceSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  author: z.string().min(2, 'Author must be at least 2 characters'),
  year: z.number().int('Year must be an integer'),
  type: z.string().min(1, 'Source type is required'),
  url: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export const updateSourceSchema = createSourceSchema.partial();

export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type UpdateSourceInput = z.infer<typeof updateSourceSchema>;
