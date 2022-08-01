import { injectable } from "tsyringe";
import { MakeRepositoryInterface } from "@modules/make/repositories/make.repository";
import { CreateDTO } from "@modules/make/dto/create.dto";
import { MakeEntity } from "@modules/make/entities/make.entity";
import { MakeException } from "@modules/make/exceptions/make.exception";
import { UpdateDTO } from "@modules/make/dto/update.dto";

@injectable()
export class MakeService {
  private repository: MakeRepositoryInterface;
  
  constructor(makeRepository: MakeRepositoryInterface) {
    this.repository = makeRepository;
  }
  
  async getAll(): Promise<MakeEntity[]> {
    return await this.repository.getAll();
  }
  
  async getById(id: string): Promise<MakeEntity | null> {
    const make = await this.repository.getById(id);
    if (!make) {
      throw MakeException.notExists()
    }
    
    return make;
  }
  
  async create(createDTO: CreateDTO): Promise<MakeEntity> {
    const makeExists = await this.repository.getByName(createDTO.name, true);
    if (makeExists && !makeExists.deletedAt) {
      throw MakeException.alreadyExists();
    }
    
    if (makeExists && makeExists.deletedAt) {
      makeExists.deletedAt = null;
      await this.repository.updateById(makeExists.id, makeExists);
      
      return makeExists;
    }
    
    const entity = new MakeEntity();
    entity.fromCreateDTO(createDTO);
    
    await this.repository.create(entity);
    
    return entity;
  }
  
  async updateById(id: string, updateDTO: UpdateDTO): Promise<MakeEntity> {
    const make = await this.repository.getById(id);
    if (!make) {
      throw MakeException.notExists();
    }
  
    const makeExists = await this.repository.getByName(updateDTO.name);
    if (makeExists && makeExists.id !== id) {
      throw MakeException.alreadyExists();
    }
    
    make.fromUpdateDTO(updateDTO);
    
    await this.repository.updateById(id, make);
    
    return make;
  }
  
  async deleteById(id: string): Promise<MakeEntity> {
    const make = await this.repository.getById(id);
    if (!make) {
      throw MakeException.notExists();
    }
    
    if (make.deletedAt) {
      return make;
    }
    
    await this.repository.deleteById(id);
    
    return make;
  }
}