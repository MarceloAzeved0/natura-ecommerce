import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { Order } from '../../entities/order';
import { OrderRepository } from '@/application/repositories/order.repository';

export interface FindByIdOrderUseCaseRequest {
  id: number;
}

export type FindByIdOrderUseCaseResponse = Order;

@Injectable()
export class FindByIdOrderUseCase
  implements
    UseCaseBase<FindByIdOrderUseCaseRequest, FindByIdOrderUseCaseResponse>
{
  constructor(private readonly OrderRepository: OrderRepository) {}

  async execute(
    request: FindByIdOrderUseCaseRequest,
  ): Promise<FindByIdOrderUseCaseResponse> {
    const { id } = request;

    return this.OrderRepository.getById(id);
  }
}
