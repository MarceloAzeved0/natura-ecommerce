import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { OrderProduct } from '@/application/entities/order-product';
import { OrderProductRepository } from '@/application/repositories/order-product.repository';

export interface ChangeQuantityUseCaseRequest {
  id: number;
  quantity: number;
}

export type ChangeQuantityUseCaseResponse = OrderProduct;

@Injectable()
export class ChangeQuantityOrderProductUseCase
  implements
    UseCaseBase<ChangeQuantityUseCaseRequest, ChangeQuantityUseCaseResponse>
{
  constructor(
    private readonly OrderProductRepository: OrderProductRepository,
  ) {}

  async execute(
    request: ChangeQuantityUseCaseRequest,
  ): Promise<ChangeQuantityUseCaseResponse> {
    const { id, quantity } = request;

    const orderProduct = await this.OrderProductRepository.getById(id);

    if (!orderProduct) {
      throw new NotFoundException('Order product not found');
    }

    // find order or fail

    orderProduct.quantity = quantity;

    const updatedData = await this.OrderProductRepository.update(
      id,
      orderProduct,
    );

    return updatedData;
  }
}
