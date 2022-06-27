import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { expect } from 'chai';
import mongoose from 'mongoose';
import {carOK, carMoksdb} from '../controllers/moks';

describe('##MODELS##', () => {
  const carModel = new CarModel();

  before(()=> {
    sinon.stub(mongoose.Model, 'create')
    .resolves(carOK);
  sinon.stub(mongoose.Model, 'find')
    .resolves(carMoksdb);
  sinon.stub(mongoose.Model, 'findOne')
    .resolves(carMoksdb[1]);
  sinon.stub(mongoose.Model, 'findByIdAndUpdate')
    .resolves(carMoksdb[1]);
  sinon.stub(mongoose.Model, 'findOneAndDelete')
    .resolves(carMoksdb[1]);
  });
  after(()=> {
    (mongoose.Model.create as sinon.SinonStub).restore();
    (mongoose.Model.findOne as sinon.SinonStub).restore();
    (mongoose.Model.find as sinon.SinonStub).restore();
    (mongoose.Model.findByIdAndUpdate as sinon.SinonStub).restore();
    (mongoose.Model.findOneAndDelete as sinon.SinonStub).restore();
  })

  it('--VERIFICA CREATE', async () => {
    const newCar = await carModel.create(carOK);
    expect(newCar).to.be.an('object');
    expect(newCar).to.be.equal(carOK);
  })
  it('--VERIFICA READ', async () => {
    const list = await carModel.read();
    expect(list).to.be.an('array');
    expect(list).to.be.equal(carMoksdb);
  })
  it('--VERIFICA READoNE', async () => {
    const find = await carModel.readOne('62b8be56bfcd1a2756852d69');
    expect(find).to.be.an('object');
    expect(find).to.be.equal(carMoksdb[1]);
  })
  it('--VERIFICA UPDATE', async () => {
    const up = await carModel.update('62b8be56bfcd1a2756852d69', carOK);
    expect(up).to.be.an('object');
    expect(up).to.be.equal(carMoksdb[1]);
  })
  it('--VERIFICA DELETE', async () => {
    const del = await carModel.delete('62b8be56bfcd1a2756852d69');
    expect(del).to.be.an('object');
    expect(del).to.be.equal(carMoksdb[1]);
  })
})
