import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { OrderProduct } from '@/application/entities/order-product';
import { OrderProductRepository } from '@/application/repositories/order-product.repository';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';

export interface CreateOrderProductUseCaseRequest {
  orderId: number;
  productId: number;
  quantity: number;
}

export type CreateOrderProductUseCaseResponse = OrderProduct;

@Injectable()
export class CreateOrderProductUseCase
  implements
    UseCaseBase<
      CreateOrderProductUseCaseRequest,
      CreateOrderProductUseCaseResponse
    >
{
  constructor(
    private findByIdUserUseCase: FindByIdUserUseCase,
    private readonly OrderProductRepository: OrderProductRepository,
  ) {}

  async execute(
    request: CreateOrderProductUseCaseRequest,
  ): Promise<CreateOrderProductUseCaseResponse> {
    const { orderId, productId, quantity } = request;

    // find product or fail

    // find order or fail

    const orderProduct = new OrderProduct({ orderId, productId, quantity });

    return this.OrderProductRepository.create(orderProduct);
  }
}
