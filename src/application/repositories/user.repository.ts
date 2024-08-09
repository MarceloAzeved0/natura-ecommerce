import { User } from '../entities/user';
import { RepositoryBase } from './base/repository.base';

export abstract class UserRepository extends RepositoryBase<User> {
  abstract getById(id: number): Promise<User | undefined>;
  abstract getByEmail(email: string): Promise<User | undefined>;
}
