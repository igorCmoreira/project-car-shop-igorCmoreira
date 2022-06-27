import * as sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { expect } from 'chai';
import mongoose from 'mongoose';
import {motoOK, motoMoksdb} from '../controllers/moks';

describe('##MODELS##', () => {
  const motoModel = new MotorcycleModel();

  before(()=> {
    sinon.stub(mongoose.Model, 'create')
    .resolves(motoOK);
  sinon.stub(mongoose.Model, 'find')
    .resolves(motoMoksdb);
  sinon.stub(mongoose.Model, 'findOne')
    .resolves(motoMoksdb[1]);
  sinon.stub(mongoose.Model, 'findByIdAndUpdate')
    .resolves(motoMoksdb[1]);
  sinon.stub(mongoose.Model, 'findOneAndDelete')
    .resolves(motoMoksdb[1]);
  });
  after(()=> {
    (mongoose.Model.create as sinon.SinonStub).restore();
    (mongoose.Model.findOne as sinon.SinonStub).restore();
    (mongoose.Model.find as sinon.SinonStub).restore();
    (mongoose.Model.findByIdAndUpdate as sinon.SinonStub).restore();
    (mongoose.Model.findOneAndDelete as sinon.SinonStub).restore();
  })

  // it('--VERIFICA CREATE', async () => {
  //   const newCar = await motoModel.create(motoOK);
  //   expect(newCar).to.be.an('object');
  //   expect(newCar).to.be.equal(motoOK);
  // })
  it('--VERIFICA READ', async () => {
    const list = await motoModel.read();
    expect(list).to.be.an('array');
    expect(list).to.be.equal(motoMoksdb);
  })
  it('--VERIFICA READoNE', async () => {
    const find = await motoModel.readOne('62b8be56bfcd1a2756852d69');
    expect(find).to.be.an('object');
    expect(find).to.be.equal(motoMoksdb[1]);
  })
  // it('--VERIFICA UPDATE', async () => {
  //   const up = await motoModel.update('62b8be56bfcd1a2756852d69', motoOK);
  //   expect(up).to.be.an('object');
  //   expect(up).to.be.equal(motoMoksdb[1]);
  // })
  it('--VERIFICA DELETE', async () => {
    const del = await motoModel.delete('62b8be56bfcd1a2756852d69');
    expect(del).to.be.an('object');
    expect(del).to.be.equal(motoMoksdb[1]);
  })
})