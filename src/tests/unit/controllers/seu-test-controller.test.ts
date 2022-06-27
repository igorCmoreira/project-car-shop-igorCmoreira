// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarService from '../../../services/CarService'
import {carOK, invalidCar, carMoksdb} from './moks';
import { request } from 'http';
import CarController from '../../../controllers/CarController';
import { assert } from 'console';


chai.use(chaiHttp);

const { expect } = chai;

describe('##Test Car controller##', () => {
  
  const carService = new CarService();
  const carController = new CarController(carService);

  const req = {
    body: {},
    params: {},
  } as any;

  const res = {
    json: sinon.spy(),
    status: sinon.stub().returns({ json: sinon.spy() }),
  } as any
  
  describe('--> Test Create',async () => {
    beforeEach(() => {
        sinon.stub(carService, 'create');
    });
  
    afterEach(()=>{
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

    describe('--> Teste readOne', async () => {
      beforeEach(async () => {
        sinon.stub(carService, 'readOne');
      }
      )

      afterEach(async()=>{
        sinon.restore();
      });

      it('-> InvalidId:: verifica se levanta erro passando um id incorreto', async () => {
        req.params = {id: '12345'};
        (carService.readOne as sinon.SinonStub).resolves()
        await carController.readOne(req, res);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledWith(res.status(400).json, {error: 'Id must have 24 hexadecimal characters'})
      });
      it('-> InternalError', async () => {
        (carService.readOne as sinon.SinonStub).resolves();
        await carController.readOne(req, res);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledWith(res.status(500).json, {error: 'Internal Server Error'})
      });
      // it('-> ValidId:: Retorno 200', async () => {
      //   req.params = { id: '62b8bda7bfcd1a2756852d66'};
      //   (carService.readOne as sinon.SinonStub).resolves();
      //   await carController.readOne(req, res);
      //   sinon.assert.calledWith(res.status, 200);
      // })
    })

  });
