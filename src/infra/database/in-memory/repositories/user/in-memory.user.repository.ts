import { User } from '@/application/entities/user';
import { UserRepository } from '@/application/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const response = new User({
      email: user.email,
      name: user.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return response;
  }
}
