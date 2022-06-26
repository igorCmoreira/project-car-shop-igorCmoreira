import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async ( 
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400)
        .json({ error: this.errors.invalidId });
    }
    try {
      const car = await this.service.readOne(id);
      return car ? res.json(car) : res.status(404)
        .json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  async update(
    req: Request<{ id: string }>,
    res: Response<Car | null | ResponseError>,
  ): Promise<(typeof res) | void> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: this.errors.badRequest });
    }
    if (id.length < 24) {
      return res.status(400)
        .json({ error: this.errors.invalidId });
    }

    const { body } = req;

    const updated = await this.service.update(id, body);
    
    if (!updated) {
      return res.status(404).json({ error: this.errors.notFound });
    }

    if ('error' in updated) return res.status(400).end();

    return res.status(200).json(updated);
  }

  async delete(
    req:Request< { id:string }>,
    res:Response<Car | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400)
        .json({ error: this.errors.invalidId });
    }
    try {
      const deleted = await this.service.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in deleted) return res.status(400).json(deleted);
      return res.status(204).json(deleted);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }
}

export default CarController;
