import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async ( 
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
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
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400)
        .json({ error: this.errors.invalidId });
    }
    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle ? res.json(motorcycle) : res.status(404)
        .json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  async update(
    req: Request<{ id: string }>,
    res: Response<Motorcycle | null | ResponseError>,
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
    res:Response<Motorcycle | ResponseError>,
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

export default MotorcycleController;
