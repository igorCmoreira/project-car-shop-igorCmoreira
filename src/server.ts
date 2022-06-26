import CustomRouter from './routes/Router';
import { Car } from './interfaces/CarInterface';
import CarController from './controllers/CarController';
import App from './app';

const server = new App();

const carController = new CarController();

const route = new CustomRouter<Car>();

route.addRoute(carController);

server.addRouter(route.router);

export default server;
