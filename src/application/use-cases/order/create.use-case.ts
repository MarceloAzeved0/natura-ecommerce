import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { Order } from '../../entities/order';
import { OrderRepository } from '@/application/repositories/order.repository';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';
import { FindByIdProductUseCase } from '@/application/use-cases/product/findById.use-case';
import { CreateOrderProductUseCase } from '@/application/use-cases/order-product/create.use-case';
interface IProductOrder {
  id: number;
  quantity: number;
}

export interface CreateOrderUseCaseRequest {
  userId: number;
  productIds: IProductOrder[];
}

export type CreateOrderUseCaseResponse = Order;

@Injectable()
export class CreateOrderUseCase
  implements UseCaseBase<CreateOrderUseCaseRequest, CreateOrderUseCaseResponse>
{
  constructor(
    private findByIdUserUseCase: FindByIdUserUseCase,
    private findByIdProductUseCase: FindByIdProductUseCase,
    private createOrderProductUseCase: CreateOrderProductUseCase,
    private readonly OrderRepository: OrderRepository,
  ) {}

  async execute(
    request: CreateOrderUseCaseRequest,
  ): Promise<CreateOrderUseCaseResponse> {
    const { userId, productIds } = request;

    const user = await this.findByIdUserUseCase.execute({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { price, discount } =
      await this.calcPriceAndDiscountByProductIds(productIds);

    const orderDB = await this.OrderRepository.create(
      new Order({ userId, discount, price }),
    );

    for (const product of productIds) {
      const { id: productId, quantity } = product;

      await this.createOrderProductUseCase.execute({
        orderId: orderDB.id,
        productId,
        quantity,
      });
    }

    return orderDB;
  }

  private async calcPriceAndDiscountByProductIds(
    productIds: IProductOrder[],
  ): Promise<{ price: number; discount: number }> {
    let price = 0;
    let discount = 0;

    for (const product of productIds) {
      const { id, quantity } = product;

      const productData = await this.findByIdProductUseCase.execute({ id });

      if (!productData) {
        throw new NotFoundException('Product not found');
      }

      discount += productData.discount * quantity;
      price += productData.price * quantity;
    }

    return { price, discount };
  }
}
