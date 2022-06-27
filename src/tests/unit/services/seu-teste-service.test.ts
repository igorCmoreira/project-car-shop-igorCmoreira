import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import CarService from '../../../services/CarService';
import { carMoksdb, carOK } from '../controllers/moks';

const carService = new CarService();

const erro = {
  sucess:false,
};
describe('--> test car service read', () => {
  before(()=> {
    sinon.stub(carService, "read").resolves(carMoksdb);
  });
  after(()=> {
    (carService.read as sinon.SinonStub).restore();
  })
  it('se o retorno da rota read esta correto', async () => {
    const list = await carService.read()
    expect(list).to.be.equal(carMoksdb)
  })
})
describe('--> test car service create', () => {
  before(()=> {
    sinon.stub(carService, "create").resolves(carOK);
  });
  after(()=> {
    (carService.create as sinon.SinonStub).restore();
  })
  it('se o retorno da rota read esta correto', async () => {
    const car = await carService.create(carOK)
    expect(car).to.be.equal(carOK)
  })
})
describe('--> test car service create', () => {
  const id = '62b8beffbfcd1a2756852d6c'
  before(()=> {
    sinon.stub(carService, "delete").resolves(carOK);
  });
  after(()=> {
    (carService.delete as sinon.SinonStub).restore();
  })
  it('se o retorno da rota create esta correto', async () => {
    const car = await carService.delete(id)
    expect(car).to.be.equal(carOK);
  })
})

