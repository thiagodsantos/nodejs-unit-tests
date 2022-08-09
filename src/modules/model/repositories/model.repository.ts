import { ModelEntity } from "@modules/model/entities/model.entity";

export const ModelRepositoryToken = 'ModelRepositoryInterface';

export interface ModelRepositoryInterface {
  getAll(): Promise<ModelEntity[]>;
  getById(id: string, withDeleted?: boolean): Promise<ModelEntity | null>;
  getByNameInMake(idMake: string, name: string, withDeleted?: boolean): Promise<ModelEntity | null>;
  create(modelEntity: ModelEntity): Promise<void>;
  updateById(id: string, modelEntity: ModelEntity): Promise<void>;
  deleteById(id: string): Promise<void>;
  recoverById(id: string): Promise<void>;
}