import { Car, CarInterface } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }
  
  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarInterface.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  update = async (id: string, obj: Car): Promise<Car | ServiceError | null> => {
    const validated = CarInterface.safeParse(obj);

    if (!validated.success) {
      return { error: validated.error };
    }
    return this.model.update(id, obj);
  };
}

export default CarService;
