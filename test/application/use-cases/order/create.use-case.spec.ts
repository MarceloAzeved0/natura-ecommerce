import { InMemoryOrderRepository } from '@/infra/database/in-memory/repositories/order/in-memory.order.repository';
import {
  CreateOrderUseCase,
  CreateOrderUseCaseRequest,
} from '@/application/use-cases/order/create.use-case';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';
import { Order } from '@/application/entities/order';
import { NotFoundException } from '@nestjs/common';
import { FindByIdProductUseCase } from '@/application/use-cases/product/findById.use-case';
import { CreateOrderProductUseCase } from '@/application/use-cases/order-product/create.use-case';

export async function createOrder(
  request: CreateOrderUseCaseRequest,
  findByIdUserUseCase: FindByIdUserUseCase,
  findByIdProductUseCase: FindByIdProductUseCase,
  createOrderProductUseCase: CreateOrderProductUseCase,
  OrderProductRepo: InMemoryOrderRepository,
): Promise<Order> {
  const createProductUseCase = new CreateOrderUseCase(
    findByIdUserUseCase,
    findByIdProductUseCase,
    createOrderProductUseCase,
    OrderProductRepo,
  );

  const response = await createProductUseCase.execute(request);

  return response;
}

describe('CreateOrderUseCase', () => {
  const mockFindByIdProductUseCase = {
    execute: jest.fn().mockResolvedValue({
      id: 1,
      name: 'product test',
      price: 1,
      discount: 1,
    }),
  } as unknown as jest.Mocked<FindByIdProductUseCase>;

  const mockCreateOrderProductUseCase = {
    execute: jest.fn().mockResolvedValue({
      id: 1,
      quantity: 1,
      productId: 1,
      orderId: 1,
    }),
  } as unknown as jest.Mocked<CreateOrderProductUseCase>;

  it('should create a Order', async () => {
    const mockFindByIdUserUseCase = {
      execute: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
    } as unknown as jest.Mocked<FindByIdUserUseCase>;

    const request: CreateOrderUseCaseRequest = {
      userId: 1,
      productIds: [{ id: 1, quantity: 2 }],
    };

    const ProductRepo = new InMemoryOrderRepository();
    const response = await createOrder(
      request,
      mockFindByIdUserUseCase,
      mockFindByIdProductUseCase,
      mockCreateOrderProductUseCase,
      ProductRepo,
    );

    expect(response.price).toEqual(2);
    expect(response.userId).toEqual(1);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });

  it('return error when not found user', async () => {
    const mockFindByIdUserUseCase = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<FindByIdUserUseCase>;

    const request: CreateOrderUseCaseRequest = {
      userId: 1,
      productIds: [{ id: 1, quantity: 2 }],
    };

    const ProductRepo = new InMemoryOrderRepository();

    await expect(
      createOrder(
        request,
        mockFindByIdUserUseCase,
        mockFindByIdProductUseCase,
        mockCreateOrderProductUseCase,
        ProductRepo,
      ),
    ).rejects.toThrow(NotFoundException);
  });
});
