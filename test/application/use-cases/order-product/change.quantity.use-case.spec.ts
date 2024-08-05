import { InMemoryOrderProductRepository } from '@/infra/database/in-memory/repositories/order-product/in-memory.order-product.repository';
import {
  ChangeQuantityOrderProductUseCase,
  ChangeQuantityUseCaseRequest,
} from '@/application/use-cases/order-product/change-quantity.use-case';
import { OrderProduct } from '@/application/entities/order-product';
import { NotFoundException } from '@nestjs/common';

export async function changeQuantityOrderProduct(
  request: ChangeQuantityUseCaseRequest,
  orderProductRepo: InMemoryOrderProductRepository,
): Promise<OrderProduct> {
  const changeQuantityProductUseCase = new ChangeQuantityOrderProductUseCase(
    orderProductRepo,
  );

  const response = await changeQuantityProductUseCase.execute(request);

  return response;
}

describe('ChangeQuantityOrderProductUseCase', () => {
  it('should changeQuantity a OrderProduct', async () => {
    const orderProductRepo = new InMemoryOrderProductRepository();

    const dataToCreateOrder = {
      orderId: 1,
      productId: 1,
      quantity: 1,
    };
    const mockOrderProduct = new OrderProduct(dataToCreateOrder);

    const orderCreated = await orderProductRepo.create(mockOrderProduct);

    const request = {
      id: orderCreated.id,
      quantity: dataToCreateOrder.quantity,
    };

    const response = await changeQuantityOrderProduct(
      request,
      orderProductRepo,
    );

    expect(response.id).toEqual(request.id);
    expect(response.quantity).toEqual(request.quantity);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });

  it('return error when not found order', async () => {
    const orderProductRepo = new InMemoryOrderProductRepository();

    await expect(
      changeQuantityOrderProduct(
        {
          id: 1,
          quantity: 1,
        },
        orderProductRepo,
      ),
    ).rejects.toThrow(NotFoundException);
  });
});
