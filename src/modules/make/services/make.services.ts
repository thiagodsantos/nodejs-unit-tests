import { injectable } from "tsyringe";
import { MakeRepositoryInterface, MakeRepositoryName } from "@modules/make/repositories/make.repository";
import { CreateDTO } from "@modules/make/dto/create.dto";
import { MakeEntity } from "@modules/make/entities/make.entity";
import { MakeException } from "@modules/make/expections/make.exception";
import container from '@src/container';

@injectable()
export class MakeService {
  private readonly repository: MakeRepositoryInterface = container.resolve(MakeRepositoryName);
  
  async getAll(): Promise<MakeEntity[]> {
    return await this.repository.getAll();
  }
  
  async getById(id: string): Promise<MakeEntity | null> {
    return await this.repository.getById(id);
  }
  
  async create(createDTO: CreateDTO): Promise<MakeEntity> {
    const makeExists = await this.repository.getByName(createDTO.name);
    if (makeExists) {
      throw MakeException.alreadyExists();
    }
    
    const entity = new MakeEntity();
    entity.fromCreateDTO(createDTO);
    
    return await this.repository.create(entity);
  }
}