import { injectable } from "inversify";
import { MakeRepositoryInterface } from "@modules/make/repositories/make.repository";

@injectable()
export class MakeRepository implements MakeRepositoryInterface {
  getAllMakes(): unknown {
    return [];
  }
}