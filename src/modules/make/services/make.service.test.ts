import sinon, { createSandbox } from 'sinon';
import { expect } from "expect";
import { afterEach } from "mocha";
import { MakeService } from "@modules/make/services/make.services";
import { MakeRepository } from "@modules/make/infrastructure/typeorm/make.repository";
import { MakeEntity } from "@modules/make/entities/make.entity";
import { MakeException } from "@modules/make/exceptions/make.exception";

describe('MakeService', () => {
  const sandbox = createSandbox();
  const makeRepository = new MakeRepository();
  
  beforeEach(() => {
    sandbox.verify();
  });
  
  afterEach(() => {
    sandbox.restore();
  })
  
  it('getAll should works', async () => {
    const makeEntity = new MakeEntity();
    makeEntity.id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    makeEntity.name = "Audi";
    
    const expected = [makeEntity];
  
    sandbox.mock(makeRepository)
      .expects("getAll")
      .returns(expected);
  
    const service = new MakeService(makeRepository);
    const result = await service.getAll();
    
    expect(result).toBe(expected);
  });
  
  it('getById should works', async () => {
    const makeEntity = new MakeEntity();
    makeEntity.id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    makeEntity.name = "Audi";
    
    const expected = makeEntity;
    
    sandbox.mock(makeRepository)
      .expects("getById")
      .returns(expected);
    
    const service = new MakeService(makeRepository);
    const result = await service.getById(makeEntity.id);
    
    expect(result).toBe(expected);
  });
  
  it('getById should throw exception', async () => {
    const expected = null;
    
    sandbox.mock(makeRepository)
      .expects("getById")
      .returns(expected);
    
    const service = new MakeService(makeRepository);
  
    await expect(async () => {
      return await service.getById("d5787550-74a5-40c6-a7e2-0d0e54f75709")
    }).rejects.toThrow();
  });
});