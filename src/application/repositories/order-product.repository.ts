import { OrderProduct } from '../entities/order-product';
import { RepositoryBase } from './base/repository.base';

export abstract class OrderProductRepository extends RepositoryBase<OrderProduct> {
  abstract update(
    id: number,
    orderProduct: OrderProduct,
  ): Promise<OrderProduct | undefined>;

  abstract getById(id: number): Promise<OrderProduct | undefined>;
}
