import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '../../application/repositories/user.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma.user.repository';
import { ProductRepository } from '@/application/repositories/product.repository';
import { PrismaProductRepository } from './prisma/repositories/prisma.product.repository';
import { OrderRepository } from '@/application/repositories/order.repository';
import { PrismaOrderRepository } from './prisma/repositories/prisma.order.repository';
import { OrderProductRepository } from '@/application/repositories/order-product.repository';
import { PrismaOrderProductRepository } from './prisma/repositories/prisma.order-product.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: OrderProductRepository,
      useClass: PrismaOrderProductRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: OrderProductRepository,
      useClass: PrismaOrderProductRepository,
    },
  ],
})
export class DatabaseModule {}
