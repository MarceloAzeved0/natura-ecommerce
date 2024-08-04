import { Order } from '@/application/entities/order';
import { Order as PrismaOrder } from '@prisma/client';

export class PrismaOrderMapper {
  private constructor() {
    throw new Error(
      'PrismaOrderMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(order: Order): PrismaOrder {
    return {
      id: order.id,
      price: order.price,
      discount: order.discount,
      userId: order.userId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  public static toDomain(orderPrismaData: PrismaOrder) {
    return new Order({
      price: orderPrismaData.price,
      userId: orderPrismaData.userId,
      discount: orderPrismaData.discount,
      createdAt: orderPrismaData.createdAt,
      updatedAt: orderPrismaData.updatedAt,
    });
  }
}
