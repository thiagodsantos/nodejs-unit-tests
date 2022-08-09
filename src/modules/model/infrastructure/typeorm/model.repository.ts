import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { datasource } from "@src/datasource";
import { ModelEntity } from "@modules/model/entities/model.entity";
import { ModelRepositoryInterface } from "@modules/model/repositories/model.repository";

@injectable()
export class ModelRepository implements ModelRepositoryInterface {
  private repository: Repository<ModelEntity>;
  
  constructor() {
    this.repository = datasource.getRepository(ModelEntity);
  }
  
  async create(modelEntity: ModelEntity): Promise<void> {
    await this.repository.save(modelEntity);
  }
  
  async deleteById(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
  
  async getAll(): Promise<ModelEntity[]> {
    return await this.repository.find({ order: { name: 'ASC' } });
  }
  
  async getById(id: string, withDeleted?: boolean): Promise<ModelEntity | null> {
    return await this.repository.findOne({ withDeleted, where: { id } });
  }
  
  async getByNameInMake(idMake: string, name: string, withDeleted?: boolean): Promise<ModelEntity | null> {
    return await this.repository.findOne({ withDeleted, where: { make: { id: idMake }, name } });
  }
  
  async updateById(id: string, modelEntity: ModelEntity): Promise<void> {
    await this.repository.update({ id }, modelEntity);
  }
  
  async recoverById(id: string): Promise<void> {
    await this.repository.restore({ id });
  }
}