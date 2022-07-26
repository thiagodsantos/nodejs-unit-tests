import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { datasource } from '@src/datasource';
import { MakeEntity } from '@modules/make/entities/make.entity';
import { MakeRepositoryInterface } from '@modules/make/repositories/make.repository';

@injectable()
export class MakeRepository implements MakeRepositoryInterface {
  private repository: Repository<MakeEntity>;
  
  constructor() {
    this.repository = datasource.getRepository(MakeEntity);
  }
  
  async getAll(): Promise<MakeEntity[]> {
    return await this.repository.find({ order: { name: 'ASC' } });
  }
  
  async getById(id: string, withDeleted = false): Promise<MakeEntity | null> {
    return this.repository.findOne({ withDeleted, where: { id } });
  }
  
  async getByName(name: string, withDeleted = false): Promise<MakeEntity | null> {
    return this.repository.findOne({ withDeleted, where: { name } });
  }
  
  async create(makeEntity: MakeEntity): Promise<void> {
    await this.repository.save(makeEntity);
  }
  
  async updateById(id: string, makeEntity: MakeEntity): Promise<void> {
    await this.repository.update({ id }, makeEntity);
  }
  
  async deleteById(id: string) {
    await this.repository.softDelete({ id });
  }
}
