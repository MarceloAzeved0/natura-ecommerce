import { Order } from '@/application/entities/order';
import { CreateOrderDto } from '../../dtos/order/create.dto';

export class OrderMapper {
  private constructor() {
    throw new Error(
      'OrderMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(order: Order): CreateOrderDto {
    return {
      id: order.id,
      discount: order.discount,
      price: order.price,
      userId: order.userId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
