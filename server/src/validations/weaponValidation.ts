import { z } from 'zod';

export const createWeaponSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.string().min(1, 'Weapon type is required'),
  eraId: z.string().min(1, 'Era is required'),
  image: z.string().optional(),
});

export const updateWeaponSchema = createWeaponSchema.partial();

export type CreateWeaponInput = z.infer<typeof createWeaponSchema>;
export type UpdateWeaponInput = z.infer<typeof updateWeaponSchema>;
