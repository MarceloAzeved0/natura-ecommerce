import { User } from '@/application/entities/user';
import { UserRepository } from '@/application/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private usersMemory: User[] = [];
  async create(user: User): Promise<User> {
    const response = new User({
      email: user.email,
      name: user.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.usersMemory.push(response);

    return response;
  }

  async getById(id: number): Promise<User | undefined> {
    return this.usersMemory.find((user) => user.id === id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.usersMemory.find((user) => user.email === email);
  }
}
