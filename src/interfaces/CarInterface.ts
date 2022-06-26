import { z } from 'zod';
import { VehicleInterface } from './VehicleInterface';

export const CarInterface = VehicleInterface.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type Car = z.infer<typeof CarInterface>;

export { Car };
