import { injectable } from 'tsyringe';
import { MakeRepositoryInterface } from '@modules/make/repositories/make.repository';
import { MakeCreateDTO } from '@modules/make/dto/make-create.dto';
import { MakeEntity } from '@modules/make/entities/make.entity';
import { MakeException } from '@modules/make/exceptions/make.exception';
import { MakeUpdateDTO } from '@modules/make/dto/make-update.dto';

@injectable()
export class MakeService {
  private makeRepository: MakeRepositoryInterface;
  
  constructor(makeRepository: MakeRepositoryInterface) {
    this.makeRepository = makeRepository;
  }
  
  async getAll(): Promise<MakeEntity[]> {
    return await this.makeRepository.getAll();
  }
  
  async getById(id: string): Promise<MakeEntity> {
    return await this.getMakeById(id);
  }
  
  async create(makeCreateDTO: MakeCreateDTO): Promise<MakeEntity> {
    const makeExists = await this.makeRepository.getByName(makeCreateDTO.name, true);
    if (makeExists && !makeExists.deletedAt) {
      throw MakeException.alreadyExists();
    }
    
    if (makeExists?.deletedAt) {
      makeExists.deletedAt = null;
      await this.makeRepository.updateById(makeExists.id, makeExists);
      
      return makeExists;
    }
    
    const entity = new MakeEntity();
    entity.fromCreateDTO(makeCreateDTO);
    await this.makeRepository.create(entity);
    
    return entity;
  }
  
  async updateById(id: string, makeUpdateDTO: MakeUpdateDTO): Promise<MakeEntity> {
    const make = await this.getMakeById(id);

    const makeExists = await this.makeRepository.getByName(makeUpdateDTO.name);
    if (makeExists && makeExists.id !== id) {
      throw MakeException.alreadyExists();
    }
    
    make.fromUpdateDTO(makeUpdateDTO);
    await this.makeRepository.updateById(id, make);
    
    return make;
  }
  
  async deleteById(id: string): Promise<MakeEntity> {
    const make = await this.getMakeById(id);
    await this.makeRepository.deleteById(id);
    
    return make;
  }
  
  private async getMakeById(id: string): Promise<MakeEntity> {
    const make = await this.makeRepository.getById(id);
    if (!make) {
      throw MakeException.notExists();
    }
    
    return make;
  }
}