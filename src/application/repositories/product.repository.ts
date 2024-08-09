import { Product } from '../entities/product';
import { RepositoryBase } from './base/repository.base';

export interface Pagination {
  limit: number;
  offset: number;
}

export interface GetManyResponse {
  products: Product[];
  total: number;
}

export type Filter = Partial<Product> & Pagination;

export abstract class ProductRepository extends RepositoryBase<Product> {
  abstract getMany(filter: Filter): Promise<GetManyResponse>;
  abstract getById(id: number): Promise<Product | undefined>;
}
