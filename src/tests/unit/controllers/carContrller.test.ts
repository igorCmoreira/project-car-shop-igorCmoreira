import sinon from 'sinon';
import CarController from '../../../controllers/CarController'
import CarService from '../../../services/CarService';

describe('####TESTE CONTROLLER####', () => {
  const carService = new CarService();
  const carController = new CarController(carService);

  const req = {
    body: {},
    params: {},
  } as any;
  
  const res ={
    status: sinon.stub().returns({json: sinon.spy() }),
    json: sinon.spy(),
  } as any;

  const carMockdb = [
    {
      _id: "62b8bda7bfcd1a2756852d66",
      model: "Ferrari Maranello",
      year: 1963,
      color: "red",
      buyValue: 3500000,
      doorsQty: 2,
      seatsQty: 2
    },
    {
      _id: "62b8be56bfcd1a2756852d69",
      model: "fiat Uno",
      year: 1963,
      color: "black",
      buyValue: 1000,
      doorsQty: 2,
      seatsQty: 5
    }
  ];

  const carOK = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  };

  const invalidCar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 1
  }

  describe('---> TEST READ', () => {
    before(()=> {
      sinon.stub(carService, 'read');
      });
    after(() => {
      (carService.read as sinon.SinonStub).restore();
    })
    it('-->teste a valid req',async () => {
      req.body = carMockdb;
      (carService.read as sinon.SinonStub).resolves(carMockdb);
      await carController.read(req, res);

      sinon.assert.calledWith(res.status,200);
      sinon.assert.calledWith(res.status(200).json, carMockdb)
    })
  });
  describe('---> TEST READONE', () => {
    before(()=> {
      sinon.stub(carService, 'readOne');
      });
    after(() => {
      (carService.readOne as sinon.SinonStub).restore();
    })
    it('-->teste a valid req',async () => {
      req.body = carMockdb[0];
      req.params = { id: '62b8be56bfcd1a2756852d69'};
      (carService.readOne as sinon.SinonStub).resolves(carMockdb[0]);
      await carController.readOne(req, res);

      sinon.assert.calledWith(res.status,200);
      sinon.assert.calledWith(res.status(200).json, carMockdb)
    })
  });
  describe('---> TEST CREATE', () => {
    before(()=> {
      sinon.stub(carService, 'create');
      });
    after(() => {
      (carService.create as sinon.SinonStub).restore();
    })
    it('-> Invalid Car:: Verifica se um carro não é criado com sucesso', async () => {
          req.body = invalidCar;
          (carService.create as sinon.SinonStub).resolves({ error: 'Value should be greater than or equal to 2' });
          await carController.create(req, res);
          sinon.assert.calledWith(res.status, 400);
          sinon.assert.calledWith(res.status(400).json, { error: 'Value should be greater than or equal to 2' });
        });
          
        it('-> Invalid request:: verifica se a requisição estiver incorreta o retorno é 500', async () => {
          req.body = null;
          (carService.create as sinon.SinonStub).resolves(null);
          await carController.create(req, res);
          sinon.assert.calledWith(res.status, 500);
          })
          
        it('-> Valid Car:: Verifica se um carro é criado com sucesso', async () => {
          req.body = carOK;
          (carService.create as sinon.SinonStub).resolves(carOK);
          await carController.create(req, res);
          sinon.assert.calledWith(res.status, 400);
          sinon.assert.calledWith(res.status(201).json, carOK);
        });
  });
  describe('---> TEST UPDATE', () => {
    before(()=> {
      sinon.stub(carService, 'update');
      });
    after(() => {
      (carService.update as sinon.SinonStub).restore();
    })
    it('-->teste a valid req',async () => {
      req.params = { id: '62b8be56bfcd1a2756852d69'}
      req.body = carMockdb;
      (carService.update as sinon.SinonStub).resolves(carMockdb[1]);
      await carController.update(req, res);

      sinon.assert.calledWith(res.status,200);
      sinon.assert.calledWith(res.status(200).json, carMockdb[1])
    })
  });

  describe('---> TEST DELETE', () => {
    before(()=> {
      sinon.stub(carService, 'delete');
      });
    after(() => {
      (carService.delete as sinon.SinonStub).restore();
    })
    it('-->teste a valid req',async () => {
      req.params = { id: '62b8be56bfcd1a2756852d69'}
      req.body = carMockdb;
      (carService.delete as sinon.SinonStub).resolves(carMockdb[1]);
      await carController.delete(req, res);

      sinon.assert.calledWith(res.status,204);
      sinon.assert.calledWith(res.status(204).json, carMockdb[1])
    });
  });
  })