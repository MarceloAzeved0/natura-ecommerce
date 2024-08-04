import { User } from '@/application/entities/user';
import { CreateUserDto } from '../dtos/create.user.dto';

export class UserMapper {
  private constructor() {
    throw new Error(
      'UserMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(user: User): CreateUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
