import { Make } from "@modules/make/entities/make.entity";

export const MakeRepositoryName = 'MakeRepositoryInterface';

export interface MakeRepositoryInterface {
  getAll(): Promise<Make[]>;
  getById(id: string): Promise<Make | []>;
  create()
}