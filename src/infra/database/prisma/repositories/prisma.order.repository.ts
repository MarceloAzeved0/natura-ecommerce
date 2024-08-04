import { Injectable } from '@nestjs/common';
import { Order } from '@/application/entities/order';
import { OrderRepository } from '@/application/repositories/order.repository';
import { PrismaService } from '../prisma.service';
import { PrismaOrderMapper } from '../mappers/prisma.order.mapper';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const orderPrismaData = PrismaOrderMapper.toPrisma(order);

    const data = await this.prismaService.order.create({
      data: orderPrismaData,
    });

    return PrismaOrderMapper.toDomain(data);
  }
}
