import { z } from 'zod';
import { VehicleInterface } from './VehicleInterface';

export const MotorcycleInterface = VehicleInterface.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().gt(0).lte(2500),
});

type Motorcycle = z.infer<typeof MotorcycleInterface>;

export { Motorcycle };
