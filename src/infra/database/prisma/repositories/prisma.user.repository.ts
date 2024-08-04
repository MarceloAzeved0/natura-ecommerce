import { Injectable } from '@nestjs/common';
import { User } from '@/application/entities/user';
import { UserRepository } from '@/application/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma.user.mapper';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(User: User): Promise<User> {
    const UserPrismaData = PrismaUserMapper.toPrisma(User);

    const data = await this.prismaService.user.create({
      data: UserPrismaData,
    });

    return PrismaUserMapper.toDomain(data);
  }

  async getById(id: number): Promise<User | undefined> {
    const data = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!data) {
      return;
    }

    return PrismaUserMapper.toDomain(data);
  }
}
