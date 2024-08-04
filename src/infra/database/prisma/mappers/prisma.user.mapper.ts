import { User } from '@/application/entities/user';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  private constructor() {
    throw new Error(
      'PrismaUserMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toDomain(userPrismaData: PrismaUser) {
    return new User({
      id: userPrismaData.id,
      name: userPrismaData.name,
      email: userPrismaData.email,
      createdAt: userPrismaData.createdAt,
      updatedAt: userPrismaData.updatedAt,
    });
  }
}
