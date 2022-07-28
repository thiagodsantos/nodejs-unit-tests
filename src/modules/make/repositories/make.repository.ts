import { MakeEntity } from "@modules/make/entities/make.entity";

export const MakeRepositoryName = 'MakeRepositoryInterface';

export interface MakeRepositoryInterface {
  getAll(): Promise<MakeEntity[]>;
  getById(id: string, withDeleted?: boolean): Promise<MakeEntity | null>;
  getByName(name: string, withDeleted?: boolean): Promise<MakeEntity | null>;
  create(makeEntity: MakeEntity): Promise<void>;
  updateById(id: string, makeEntity: MakeEntity): Promise<void>;
  deleteById(id: string): Promise<void>;
}