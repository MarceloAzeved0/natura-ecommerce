import { OrderProduct } from '../entities/order-product';
import { RepositoryBase } from './base/repository.base';

export abstract class OrderProductRepository extends RepositoryBase<OrderProduct> {}
