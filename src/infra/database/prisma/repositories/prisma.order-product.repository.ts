import { Injectable } from '@nestjs/common';
import { OrderProduct } from '@/application/entities/order-product';
import { OrderProductRepository } from '@/application/repositories/order-product.repository';
import { PrismaService } from '../prisma.service';
import { PrismaOrderProductMapper } from '../mappers/prisma.order-product.mapper';

@Injectable()
export class PrismaOrderProductRepository implements OrderProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    const orderProductPrismaData =
      PrismaOrderProductMapper.toPrisma(orderProduct);

    const data = await this.prismaService.orderProduct.create({
      data: orderProductPrismaData,
    });

    return PrismaOrderProductMapper.toDomain(data);
  }

  async getById(id: number): Promise<OrderProduct | undefined> {
    const data = await this.prismaService.orderProduct.findUnique({
      where: { id },
    });

    if (!data) {
      return;
    }

    return PrismaOrderProductMapper.toDomain(data);
  }

  async update(
    id: number,
    orderProduct: OrderProduct,
  ): Promise<OrderProduct | undefined> {
    const prismaOrderProduct = PrismaOrderProductMapper.toPrisma(orderProduct);

    const data = await this.prismaService.orderProduct.update({
      where: { id },
      data: prismaOrderProduct,
    });

    if (!data) {
      return;
    }

    return PrismaOrderProductMapper.toDomain(data);
  }
}
