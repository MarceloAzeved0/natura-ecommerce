import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { User } from '../../entities/user';
import { UserRepository } from '@/application/repositories/user.repository';

export interface GetOrCreateUserUseCaseRequest {
  name: string;
  email: string;
}

export type GetOrCreateUserUseCaseResponse = User;

@Injectable()
export class GetOrCreateUserUseCase
  implements
    UseCaseBase<GetOrCreateUserUseCaseRequest, GetOrCreateUserUseCaseResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: GetOrCreateUserUseCaseRequest,
  ): Promise<GetOrCreateUserUseCaseResponse> {
    const { name, email } = request;

    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    const user = new User({
      name,
      email,
    });

    return this.userRepository.create(user);
  }
}
