import { User } from '../entities/user';
import { RepositoryBase } from './base/repository.base';

export abstract class UserRepository extends RepositoryBase<User> {}
