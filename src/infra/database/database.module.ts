import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '../../application/repositories/user.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma.user.repository';
import { ProductRepository } from '@/application/repositories/product.repository';
import { PrismaProductRepository } from './prisma/repositories/prisma.product.repository';

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
  ],
})
export class DatabaseModule {}
