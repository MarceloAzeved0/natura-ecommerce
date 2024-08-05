import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { OrderProduct } from '@/application/entities/order-product';
import { OrderProductRepository } from '@/application/repositories/order-product.repository';
import { FindByIdProductUseCase } from '@/application/use-cases/product/findById.use-case';
import { FindByIdOrderUseCase } from '@/application/use-cases/order/findById.use-case';

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
    private findByIdOrderUseCase: FindByIdOrderUseCase,
    private findByIdProductUseCase: FindByIdProductUseCase,
    private readonly OrderProductRepository: OrderProductRepository,
  ) {}

  async execute(
    request: CreateOrderProductUseCaseRequest,
  ): Promise<CreateOrderProductUseCaseResponse> {
    const { orderId, productId, quantity } = request;

    const product = await this.findByIdProductUseCase.execute({
      id: productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const order = await this.findByIdOrderUseCase.execute({ id: orderId });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderProduct = new OrderProduct({ orderId, productId, quantity });

    return this.OrderProductRepository.create(orderProduct);
  }
}
