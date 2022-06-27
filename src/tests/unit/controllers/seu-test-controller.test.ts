// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarService from '../../../services/CarService'
import {carOK, invalidCar, carMoksdb, motoMoksdb, upCar} from './moks';
import CarController from '../../../controllers/CarController';
import { before } from 'mocha';


chai.use(chaiHttp);

const { expect } = chai;


describe('##Teste controller##', () => {
 const carService = new CarService();
 const carController = new CarController();

 const req = {
  body: {},
  params: {},
} as any;

const res = {
  json: sinon.spy(),
  status: sinon.stub().returns({ json: sinon.spy() }),
} as any

// before(()=> {
//   sinon.stub(carService, 'create');
//   sinon.stub(carService, 'readOne');
//   sinon.stub(carService, 'update');
//   sinon.stub(carService, 'read');
//   sinon.stub(carService, 'delete');
// });
// after(() => {
//   (carService.create as sinon.SinonStub).restore();
//   (carService.readOne as sinon.SinonStub).restore();
//   (carService.update as sinon.SinonStub).restore();
//   (carService.read as sinon.SinonStub).restore();
//   (carService.delete as sinon.SinonStub).restore();
// });

describe('--> TESTE CREATE',  () => {
  before(()=> {
    sinon.stub(carService, 'create');

  });
  after(() => {
    (carService.create as sinon.SinonStub).restore();
  });
  
  it('-> Invalid Car:: Verifica se um carro não é criado com sucesso', async () => {
    req.body = invalidCar;
    (carService.create as sinon.SinonStub).resolves({ error: 'Id must have 24 hexadecimal characters' });
    await carController.create(req, res);
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.status(400).json, { error: 'Id must have 24 hexadecimal characters' });
  });
    
  it('-> Invalid request:: verifica se a requisição estiver incorreta o retorno é 500', async () => {
    req.body = null;
    (carService.create as sinon.SinonStub).resolves(null);
    await carController.create(req, res);
    sinon.assert.calledWith(res.status, 500);
    })
    
  it('-> Valid Car:: Verifica se um carro é criado com sucesso', async () => {
    req.body = carOK;
    (carService.create as sinon.SinonStub).resolves(carMoksdb[0]);
    await carController.create(req, res);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.status(201).json, carMoksdb[0]);
  });
});
// describe('-->Teste readOne',  ()=>{
//   it('-> InvalidId:: verifica se levanta erro passando um id incorreto', async () => {
//     req.params = {id: '12345'};
//     (carService.readOne as sinon.SinonStub).resolves()
//     await carController.readOne(req, res);
//     sinon.assert.calledWith(res.status, 400);
//     sinon.assert.calledWith(res.status(400).json, {error: 'Id must have 24 hexadecimal characters'})
//   });
//   it('-> InternalError', async () => {
//     (carService.readOne as sinon.SinonStub).resolves();
//     await carController.readOne(req, res);
//     sinon.assert.calledWith(res.status, 500);
//     sinon.assert.calledWith(res.status(500).json, {error: 'Internal Server Error'})
//   });
//   it('-> ValidId:: Retorno 200', async () => {
//     req.params = { id: '62b8bda7bfcd1a2756852d66'};
//     (carService.readOne as sinon.SinonStub).resolves();
//     await carController.readOne(req, res);
//     sinon.assert.calledWith(res.status, 200);
//   })
// });
// describe('-->Teste read', () => {
//   it('-> valid::', async () => {
//   req.body= {};
//   req.params = {};
//   (carService.read as sinon.SinonStub).resolves(carMoksdb);
//   await carController.read(req, res);

//   sinon.assert.calledWith(res.status, 200);
//   sinon.assert.calledWith(res.status(200).json, carMoksdb)
//   })
// })

// describe('-->Teste update',  () => {
//   it('->Valid up::', async () => {
//   req.body = carMoksdb;
//   req.params= { id: '62b8bda7bfcd1a2756852d66'};
//   (carService.update as sinon.SinonStub).resolves(carMoksdb[0]);
//   await carController.update(req, res);

//   sinon.assert.calledWith(res.status, 200);
//   sinon.assert.calledWith(res.status(200).json, carMoksdb[0])
// })
// })
// // it('-->Teste delete', async () => {
// //   req.body = carMoksdb;
// //   req.params= { id: '62b8bda7bfcd1a2756852d66'};
// //   (carService.delete as sinon.SinonStub).resolves(carMoksdb[0]);
// //   await carController.delete(req, res);

// //   sinon.assert.calledWith(res.status, 400);
// // })
});