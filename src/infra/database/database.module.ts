import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '../../application/repositories/user.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma.user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class DatabaseModule {}
