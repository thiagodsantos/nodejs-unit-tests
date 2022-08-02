import { expect } from "expect";
import { afterEach, beforeEach } from "mocha";
import { createSandbox } from "sinon";
import { MakeService } from "@modules/make/services/make.services";
import { MakeRepository } from "@modules/make/infrastructure/typeorm/make.repository";
import { MakeEntity } from "@modules/make/entities/make.entity";
import { MakeCreateDTO } from "@modules/make/dto/make-create.dto";
import { MakeUpdateDTO } from "@modules/make/dto/make-update.dto";
import { MakeException } from "@modules/make/exceptions/make.exception";

describe('MakeService', () => {
  const sandbox = createSandbox();
  const makeRepository = new MakeRepository();
  
  beforeEach(() => {
    sandbox.verify();
  });
  
  afterEach(() => {
    sandbox.restore();
  });
  
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
  
  it('getById should throw exception when make not exists', async () => {
    const expected = null;
    
    sandbox.mock(makeRepository)
      .expects("getById")
      .returns(expected);
  
    const service = new MakeService(makeRepository);
    await expect(service.getById("d5787550-74a5-40c6-a7e2-0d0e54f75709"))
      .rejects.toThrow(MakeException.notExists());
  });
  
  it('create should works', async () => {
    const makeCreateDTO = new MakeCreateDTO();
    makeCreateDTO.name = "Audi";
    
    const makeEntity = new MakeEntity()
    makeEntity.name = makeCreateDTO.name;
    
    sandbox.mock(makeRepository)
      .expects("getByName")
      .returns(null)
  
    sandbox.mock(makeRepository)
      .expects("create")
      .withArgs(makeEntity)
      .once();
    
    const service = new MakeService(makeRepository);
    const result = await service.create(makeCreateDTO);
    
    expect(result).toBeInstanceOf(MakeEntity);
    expect(result.name).toBe(makeCreateDTO.name);
  });
  
  it('create should throw exception when make by name already exists', async () => {
    const makeCreateDTO = new MakeCreateDTO();
    makeCreateDTO.name = "Audi";
  
    const makeEntity = new MakeEntity();
    makeEntity.id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    makeEntity.name = "Honda";
    makeEntity.deletedAt = null;
  
    sandbox.mock(makeRepository)
      .expects("getByName")
      .withArgs(makeCreateDTO.name, true)
      .returns(makeEntity);
  
    const service = new MakeService(makeRepository);
    await expect(service.create(makeCreateDTO))
      .rejects.toThrow(MakeException.alreadyExists());
  });
  
  it('create should works recovering deleted make', async () => {
    const makeCreateDTO = new MakeCreateDTO();
    makeCreateDTO.name = "Audi";
  
    const makeEntity = new MakeEntity();
    makeEntity.id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    makeEntity.name = "Honda";
    makeEntity.deletedAt = new Date();
  
    sandbox.mock(makeRepository)
      .expects("getByName")
      .withArgs(makeCreateDTO.name, true)
      .returns(makeEntity);
  
    sandbox.mock(makeRepository)
      .expects("updateById")
      .withArgs(makeEntity.id, makeEntity);
  
    sandbox.mock(makeRepository)
      .expects("create")
      .never();
  
    const service = new MakeService(makeRepository);
    const result = await service.create(makeCreateDTO);
    
    expect(result).toBeInstanceOf(MakeEntity);
    expect(result.id).toBe(makeEntity.id);
    expect(result.deletedAt).toBeNull();
  });
  
  it('updateById should works', async () => {
    const id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    const makeUpdateDTO = new MakeUpdateDTO();
    makeUpdateDTO.name = "Honda";
    
    const makeEntity = new MakeEntity();
    makeEntity.id = id;
    makeEntity.name = "Ronda";
    
    sandbox.mock(makeRepository)
      .expects("getById")
      .withArgs(id)
      .returns(makeEntity);
  
    sandbox.mock(makeRepository)
      .expects("getByName")
      .withArgs(makeUpdateDTO.name)
      .returns(null);
  
    sandbox.mock(makeRepository)
      .expects("updateById")
      .withArgs(id, makeEntity);
    
    const service = new MakeService(makeRepository);
    const result = await service.updateById(id, makeUpdateDTO);
    
    expect(result).toBeInstanceOf(MakeEntity);
    expect(result.name).toBe(makeUpdateDTO.name);
  });
  
  it('updateById should throw exception when make by name already exists in another make', async () => {
    const id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    const makeUpdateDTO = new MakeUpdateDTO();
    makeUpdateDTO.name = "Honda";
  
    const makeEntity = new MakeEntity();
    makeEntity.id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    makeEntity.name = "Honda";
    
    const makeEntityExistsByName = new MakeEntity();
    makeEntity.id = "34db4ee7-3e6f-446e-bc87-76a5ee784ac9";
    makeEntity.name = "Honda";
  
    sandbox.mock(makeRepository)
      .expects("getById")
      .withArgs(id)
      .returns(makeEntity);
  
    sandbox.mock(makeRepository)
      .expects("getByName")
      .withArgs(makeUpdateDTO.name)
      .returns(makeEntityExistsByName);
    
    const service = new MakeService(makeRepository);
    await expect(service.updateById(id, makeUpdateDTO))
      .rejects.toThrow(MakeException.alreadyExists());
  });
  
  it('deleteById should works', async () => {
    const id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    const makeEntity = new MakeEntity();
    makeEntity.id = id;
    makeEntity.name = "Honda";
    
    sandbox.mock(makeRepository)
      .expects("getById")
      .withArgs(id)
      .returns(makeEntity);
  
    sandbox.mock(makeRepository)
      .expects("deleteById")
      .withArgs(id);
  
    const service = new MakeService(makeRepository);
    const result = await service.deleteById(id);
  
    expect(result).toBeInstanceOf(MakeEntity);
    expect(result.id).toBe(id);
  });
  
  it('deleteById should throw exception when make not exists', async () => {
    const id = "d5787550-74a5-40c6-a7e2-0d0e54f75709";
    
    sandbox.mock(makeRepository)
      .expects("getById")
      .withArgs(id)
      .returns(null);
  
    sandbox.mock(makeRepository)
      .expects("deleteById")
      .never();
  
    const service = new MakeService(makeRepository);
    await expect(service.deleteById(id))
      .rejects.toThrow(MakeException.notExists());
  });
});