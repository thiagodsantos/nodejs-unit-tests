import { injectable } from "tsyringe";
import { ModelRepositoryInterface } from "@modules/model/repositories/model.repository";
import { ModelEntity } from "@modules/model/entities/model.entity";
import { ModelCreateDTO } from "@modules/model/dto/model-create.dto";
import { ModelException } from "@modules/model/exceptions/model.exception";
import { MakeService } from "@modules/make/services/make.service";
import { MakeException } from "@modules/make/exceptions/make.exception";
import { ModelUpdateDTO } from "@modules/model/dto/model-update.dto";

@injectable()
export class ModelService {
  private modelRepository: ModelRepositoryInterface;
  private makeService: MakeService;
  
  constructor(
    modelRepository: ModelRepositoryInterface,
    makeService: MakeService
  ) {
    this.modelRepository = modelRepository;
    this.makeService = makeService;
  }
  
  async getAll(): Promise<ModelEntity[]> {
    return await this.modelRepository.getAll();
  }
  
  async getById(id: string): Promise<ModelEntity | null> {
    return await this.modelRepository.getById(id);
  }
  
  async create(modelCreateDTO: ModelCreateDTO): Promise<ModelEntity> {
    const makeExists = await this.makeService.getById(modelCreateDTO.idMake);
    if (!makeExists) {
      throw MakeException.notExists();
    }
    
    const modelExists = await this.modelRepository.getByNameInMake(modelCreateDTO.idMake, modelCreateDTO.name, true);
    if(modelExists && !modelExists.deletedAt) {
      throw ModelException.alreadyExists();
    }
    
    if (modelExists?.deletedAt) {
      await this.modelRepository.recoverById(modelExists.id);
      
      return modelExists;
    }
    
    const entity = new ModelEntity();
    entity.fromCreateDTO(modelCreateDTO);
    await this.modelRepository.create(entity);
    
    return entity;
  }
  
  async updateById(id: string, modelUpdateDTO: ModelUpdateDTO): Promise<ModelEntity> {
    const model = await this.getModelById(id);
    
    const modelExists = await this.modelRepository.getByNameInMake(modelUpdateDTO.idMake, modelUpdateDTO.name);
    if (modelExists && modelExists.id !== id) {
      throw ModelException.alreadyExists();
    }
    
    model.fromUpdateDTO(modelUpdateDTO);
    await this.modelRepository.updateById(id, model);
    
    return model;
  }
  
  async deleteById(id: string): Promise<ModelEntity> {
    const model = await this.getModelById(id);
    await this.modelRepository.deleteById(id);
    
    return model;
  }
  
  private async getModelById(id: string): Promise<ModelEntity> {
    const model = await this.modelRepository.getById(id);
    if (!model) {
      throw ModelException.notExists();
    }
    
    return model;
  }
}