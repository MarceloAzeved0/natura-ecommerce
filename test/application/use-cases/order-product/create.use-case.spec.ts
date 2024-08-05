import { InMemoryOrderProductRepository } from '@/infra/database/in-memory/repositories/order-product/in-memory.order-product.repository';
import {
  CreateOrderProductUseCase,
  CreateOrderProductUseCaseRequest,
} from '@/application/use-cases/order-product/create.use-case';
import { OrderProduct } from '@/application/entities/order-product';
import { FindByIdProductUseCase } from '@/application/use-cases/product/findById.use-case';
import { FindByIdOrderUseCase } from '@/application/use-cases/order/findById.use-case';
import { NotFoundException } from '@nestjs/common';

export async function createOrderProduct(
  request: CreateOrderProductUseCaseRequest,
  findByIdOrderUseCase: FindByIdOrderUseCase,
  findByIdProductUseCase: FindByIdProductUseCase,
  orderProductRepo: InMemoryOrderProductRepository,
): Promise<OrderProduct> {
  const createProductUseCase = new CreateOrderProductUseCase(
    findByIdOrderUseCase,
    findByIdProductUseCase,
    orderProductRepo,
  );

  const response = await createProductUseCase.execute(request);

  return response;
}

describe('CreateOrderProductUseCase', () => {
  const mockFindByIdProductUseCase = {
    execute: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'product', price: 1.99 }),
  } as unknown as jest.Mocked<FindByIdProductUseCase>;

  const mockFindByIdOrderUseCase = {
    execute: jest
      .fn()
      .mockResolvedValue({ id: 1, descount: 3.0, price: 10.99 }),
  } as unknown as jest.Mocked<FindByIdOrderUseCase>;

  it('should create a OrderProduct', async () => {
    const request: CreateOrderProductUseCaseRequest = {
      orderId: 1,
      productId: 1,
      quantity: 1,
    };

    const ProductRepo = new InMemoryOrderProductRepository();
    const response = await createOrderProduct(
      request,
      mockFindByIdOrderUseCase,
      mockFindByIdProductUseCase,
      ProductRepo,
    );

    expect(response.orderId).toEqual(request.orderId);
    expect(response.productId).toEqual(request.productId);
    expect(response.quantity).toEqual(request.quantity);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });

  it('should receive error when order not found', async () => {
    const mockFindByIdOrderUseCaseNotFound = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<FindByIdOrderUseCase>;

    const request: CreateOrderProductUseCaseRequest = {
      orderId: 99,
      productId: 1,
      quantity: 1,
    };

    const ProductRepo = new InMemoryOrderProductRepository();
    await expect(
      createOrderProduct(
        request,
        mockFindByIdOrderUseCaseNotFound,
        mockFindByIdProductUseCase,
        ProductRepo,
      ),
    ).rejects.toThrow(NotFoundException);
  });
});
