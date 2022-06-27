import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';

chai.use(chaiHttp);

const {expect} = chai;

describe('##TESTE CAR SERVICE##', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
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

  const oneCar = {
    _id: "62b8bda7bfcd1a2756852d66",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2
  }


  describe('-->read request', () => {
    before(()=> {
      sinon.stub(carModel, 'read').resolves(carMockdb)
    })
    after(()=> {
      (carModel.read as sinon.SinonStub).restore(); 
    })
    it('-> sucsses', async () => {
      const list = await carService.read();

      expect(list).to.be.a.a('array');
      expect(list).to.have.length(2);
      expect(list).to.be.equal(carMockdb);
    });
  });
  describe('-->readOne request', () => {
    before(()=> {
      sinon.stub(carModel, 'readOne').resolves(oneCar)
    })
    after(()=> {
      (carModel.readOne as sinon.SinonStub).restore(); 
    })
    it('-> sucsses', async () => {
      const list = await carService.readOne('62b8bda7bfcd1a2756852d66');

      expect(list).to.be.a.a('object');
      expect(list).to.have.keys('_id', 'model', 'year', 'color', 'buyValue', 'seatsQty', 'doorsQty');
      expect(list).to.be.equal(oneCar);
    });
  });
  describe('-->UPDATE request', () => {
    before(()=> {
      sinon.stub(carModel, 'update').resolves(oneCar)
    })
    after(()=> {
      (carModel.update as sinon.SinonStub).restore(); 
    })
    it('-> sucsses', async () => {
      const upcar = await carService.update('62b8bda7bfcd1a2756852d66', oneCar);

      expect(upcar).to.be.a.a('object');
      expect(upcar).to.have.keys('_id', 'model', 'year', 'color', 'buyValue', 'seatsQty', 'doorsQty');
      expect(upcar).to.be.equal(oneCar);
    });
  });
})