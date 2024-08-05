import { OrderProduct } from '@/application/entities/order-product';
import { CreateOrderProductDto } from '../../dtos/order-product/create.dto';

export class OrderProductMapper {
  private constructor() {
    throw new Error(
      'OrderProductMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(orderProduct: OrderProduct): CreateOrderProductDto {
    return {
      id: orderProduct.id,
      quantity: orderProduct.quantity,
      productId: orderProduct.productId,
      orderId: orderProduct.orderId,
      createdAt: orderProduct.createdAt,
      updatedAt: orderProduct.updatedAt,
    };
  }
}
