import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { User } from '../../entities/user';
import { UserRepository } from '@/application/repositories/user.repository';

export interface FindByIdUserUseCaseRequest {
  id: number;
}

export type FindByIdUserUseCaseResponse = User;

@Injectable()
export class FindByIdUserUseCase
  implements
    UseCaseBase<FindByIdUserUseCaseRequest, FindByIdUserUseCaseResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: FindByIdUserUseCaseRequest,
  ): Promise<FindByIdUserUseCaseResponse> {
    const { id } = request;

    return this.userRepository.getById(id);
  }
}
