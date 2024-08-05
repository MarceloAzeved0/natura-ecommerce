import { InMemoryOrderRepository } from '@/infra/database/in-memory/repositories/order/in-memory.order.repository';
import {
  CreateOrderUseCase,
  CreateOrderUseCaseRequest,
} from '@/application/use-cases/order/create.use-case';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';
import { Order } from '@/application/entities/order';
import { NotFoundException } from '@nestjs/common';

export async function createOrder(
  request: CreateOrderUseCaseRequest,
  findByIdUserUseCase: FindByIdUserUseCase,
  OrderProductRepo: InMemoryOrderRepository,
): Promise<Order> {
  const createProductUseCase = new CreateOrderUseCase(
    findByIdUserUseCase,
    OrderProductRepo,
  );

  const response = await createProductUseCase.execute(request);

  return response;
}

describe('CreateOrderUseCase', () => {
  it('should create a Order', async () => {
    const mockFindByIdUserUseCase = {
      execute: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
    } as unknown as jest.Mocked<FindByIdUserUseCase>;

    const request: CreateOrderUseCaseRequest = {
      userId: 1,
    };

    const ProductRepo = new InMemoryOrderRepository();
    const response = await createOrder(
      request,
      mockFindByIdUserUseCase,
      ProductRepo,
    );

    expect(response.price).toEqual(0);
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
    };

    const ProductRepo = new InMemoryOrderRepository();

    await expect(
      createOrder(request, mockFindByIdUserUseCase, ProductRepo),
    ).rejects.toThrow(NotFoundException);
  });
});
