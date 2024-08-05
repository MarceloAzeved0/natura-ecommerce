import { OrderProduct } from '@/application/entities/order-product';
import { OrderProduct as PrismaOrderProduct } from '@prisma/client';

export class PrismaOrderProductMapper {
  private constructor() {
    throw new Error(
      'PrismaOrderProductMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(orderProduct: OrderProduct): PrismaOrderProduct {
    return {
      id: orderProduct.id,
      quantity: orderProduct.quantity,
      productId: orderProduct.productId,
      orderId: orderProduct.orderId,
      createdAt: orderProduct.createdAt,
      updatedAt: orderProduct.updatedAt,
    };
  }

  public static toDomain(orderProductPrismaData: PrismaOrderProduct) {
    return new OrderProduct({
      quantity: orderProductPrismaData.quantity,
      productId: orderProductPrismaData.productId,
      orderId: orderProductPrismaData.orderId,
      createdAt: orderProductPrismaData.createdAt,
      updatedAt: orderProductPrismaData.updatedAt,
    });
  }
}
