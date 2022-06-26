import CustomRouter from './routes/Router';
import { Car } from './interfaces/CarInterface';
import CarController from './controllers/CarController';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import MotorcycleController from './controllers/MotorcicleController';
import App from './app';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const routeC = new CustomRouter<Car>();
const routeM = new CustomRouter<Motorcycle>();

routeC.addRoute(carController);
routeM.addRoute(motorcycleController);

server.addRouter(routeC.router);
server.addRouter(routeM.router);

export default server;
