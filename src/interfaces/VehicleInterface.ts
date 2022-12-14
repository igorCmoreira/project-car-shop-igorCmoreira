import { z } from 'zod';

export const VehicleInterface = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.optional(z.boolean()),
  buyValue: z.number().int(),
});

type Vehicle = z.infer<typeof VehicleInterface>;

export { Vehicle };
