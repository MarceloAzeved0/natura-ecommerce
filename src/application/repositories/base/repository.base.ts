export abstract class RepositoryBase<TEntity> {
  abstract create(data: TEntity): Promise<TEntity>;
  // abstract update(id: number, data: TEntity): Promise<TEntity>;
  // abstract getById(id: number): Promise<TEntity>;
  // abstract getMany(filter: Filter<TEntity>): Promise<TEntity[]>;
}
