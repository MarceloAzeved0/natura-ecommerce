import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { Order } from '../../entities/order';
import { OrderRepository } from '@/application/repositories/order.repository';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';

export interface CreateOrderUseCaseRequest {
  userId: number;
}

export type CreateOrderUseCaseResponse = Order;

@Injectable()
export class CreateOrderUseCase
  implements UseCaseBase<CreateOrderUseCaseRequest, CreateOrderUseCaseResponse>
{
  constructor(
    private findByIdUserUseCase: FindByIdUserUseCase,
    private readonly OrderRepository: OrderRepository,
  ) {}

  async execute(
    request: CreateOrderUseCaseRequest,
  ): Promise<CreateOrderUseCaseResponse> {
    const { userId } = request;

    const user = await this.findByIdUserUseCase.execute({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Order({ userId });

    return this.OrderRepository.create(order);
  }
}
