import { expect } from "expect";
import { afterEach } from "mocha";
import sinon, { mock, SinonMockStatic } from 'sinon';
import { MakeService } from "@modules/make/services/make.services";
import { MakeRepository } from "@modules/make/infrastructure/typeorm/make.repository";
import { MakeEntity } from "@modules/make/entities/make.entity";

describe('MakeService', () => {
  let mockMakeRepository: SinonMockStatic[MakeRepository];
  
  beforeEach(() => {
    const makeRepository = new MakeRepository();
    mockMakeRepository = sinon.mock(makeRepository);
  });
  
  afterEach(() => {
    mockMakeRepository = sinon.restore();
  })
  
  it('getAll should works', async () => {
    const makeEntity = new MakeEntity();
    makeEntity.id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    makeEntity.name = "Audi";
    
    const expected = [makeEntity];
  
    const makeRepository = new MakeRepository();
    sinon.mock(makeRepository)
      .expects("getAll")
      .returns(expected);
  
    const service = new MakeService(makeRepository);
    const result = await service.getAll();
    
    expect(result).toBe(expected);
  });
});