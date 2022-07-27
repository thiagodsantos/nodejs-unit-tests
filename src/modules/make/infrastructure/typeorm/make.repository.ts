import { injectable } from "tsyringe";
import { datasource } from "@src/datasource";
import { MakeEntity } from "@modules/make/entities/make.entity";
import { MakeRepositoryInterface } from "@modules/make/repositories/make.repository";

@injectable()
export class MakeRepository implements MakeRepositoryInterface {
  private readonly repository = datasource.getRepository(MakeEntity);
  
  async getAll(): Promise<MakeEntity[]> {
    return await this.repository.find({ order: { name: 'ASC' } });
  }
  
  async getById(id: string): Promise<MakeEntity | null> {
    return await this.repository.findOneBy({ id });
  }
  
  async getByName(name: string): Promise<MakeEntity | null> {
    return this.repository.findOneBy({ name });
  }
  
  async create(makeEntity: MakeEntity): Promise<MakeEntity> {
    return await this.repository.save(makeEntity);
  }
}