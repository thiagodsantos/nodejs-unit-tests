import { inject, injectable } from "inversify";
import { MakeRepositoryIdentifier, MakeRepositoryInterface } from "@modules/make/repositories/make.repository";

@injectable()
export class MakeService {
  constructor(@inject(MakeRepositoryIdentifier) private readonly makeRepository: MakeRepositoryInterface) {}
  
  getAllMakes() {
    return this.makeRepository.getAllMakes();
  }
}