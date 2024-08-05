import { Order } from '../entities/order';
import { RepositoryBase } from './base/repository.base';

export abstract class OrderRepository extends RepositoryBase<Order> {
  abstract getById(id: number): Promise<Order | undefined>;
}
