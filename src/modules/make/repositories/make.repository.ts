import { MakeEntity } from "@modules/make/entities/make.entity";

export const MakeRepositoryName = 'MakeRepositoryInterface';

export interface MakeRepositoryInterface {
  getAll(): Promise<MakeEntity[]>;
  getById(id: string): Promise<MakeEntity | null>;
  getByName(name: string): Promise<MakeEntity | null>
  create(makeEntity: MakeEntity): Promise<MakeEntity>;
}