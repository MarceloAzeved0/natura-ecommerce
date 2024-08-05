import { InMemoryOrderRepository } from '@/infra/database/in-memory/repositories/order/in-memory.order.repository';
import {
  FindByIdOrderUseCase,
  FindByIdOrderUseCaseRequest,
} from '@/application/use-cases/order/findById.use-case';
import { Order } from '@/application/entities/order';

describe('FindByIdOrderUseCase', () => {
  it('should findById a order', async () => {
    const orderRepo = new InMemoryOrderRepository();

    const dataOrder = { userId: 1 };

    const createdOrder = await orderRepo.create(new Order(dataOrder));
    const findByIdOrderUseCase = new FindByIdOrderUseCase(orderRepo);

    const request: FindByIdOrderUseCaseRequest = {
      id: createdOrder.id,
    };

    const response = await findByIdOrderUseCase.execute(request);

    expect(response.id).toEqual(request.id);
    expect(response.userId).toEqual(dataOrder.userId);
    expect(response.price).toEqual(0);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });

  it('return undefined when not found order', async () => {
    const orderRepo = new InMemoryOrderRepository();

    const findByIdOrderUseCase = new FindByIdOrderUseCase(orderRepo);

    const request: FindByIdOrderUseCaseRequest = {
      id: 0,
    };

    const response = await findByIdOrderUseCase.execute(request);

    expect(response).toBe(undefined);
  });
});
