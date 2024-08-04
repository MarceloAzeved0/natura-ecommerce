import { EntityBase } from '@/application/entities/base/entity.base';

export abstract class RepositoryBase<TEntity extends EntityBase> {
  abstract create(data: TEntity): Promise<TEntity>;
  // abstract update(id: number, data: TEntity): Promise<TEntity>;
  // abstract getById(id: number): Promise<TEntity>;
  // abstract getAll(): Promise<TEntity[]>;
}
