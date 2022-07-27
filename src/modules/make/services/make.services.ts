import { injectable } from "tsyringe";
import { MakeRepositoryInterface, MakeRepositoryName } from "@modules/make/repositories/make.repository";
import container from '@src/container';

@injectable()
export class MakeService {
  private readonly makeRepository: MakeRepositoryInterface = container.resolve(MakeRepositoryName);
  
  async getAll() {
    return await this.makeRepository.getAll();
  }
  
  async getById(id: string) {
    return await this.makeRepository.getById(id);
  }
}