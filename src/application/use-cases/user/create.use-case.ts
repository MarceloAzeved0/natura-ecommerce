import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { User } from '../../entities/user';
import { UserRepository } from '@/application/repositories/user.repository';

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
}

export type CreateUserUseCaseResponse = User;

@Injectable()
export class CreateUserUseCase
  implements UseCaseBase<CreateUserUseCaseRequest, CreateUserUseCaseResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { name, email } = request;

    const user = new User({
      name,
      email,
    });

    return this.userRepository.create(user);
  }
}
