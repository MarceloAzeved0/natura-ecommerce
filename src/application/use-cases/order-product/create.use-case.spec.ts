import { InMemoryOrderProductRepository } from '@/infra/database/in-memory/repositories/order-product/in-memory.order-product.repository';
import {
  CreateOrderProductUseCase,
  CreateOrderProductUseCaseRequest,
} from '@/application/use-cases/order-product/create.use-case';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';
import { OrderProduct } from '@/application/entities/order-product';

export async function createOrderProduct(
  request: CreateOrderProductUseCaseRequest,
  findByIdUserUseCase: FindByIdUserUseCase,
  orderProductRepo: InMemoryOrderProductRepository,
): Promise<OrderProduct> {
  const createProductUseCase = new CreateOrderProductUseCase(
    findByIdUserUseCase,
    orderProductRepo,
  );

  const response = await createProductUseCase.execute(request);

  return response;
}

describe('CreateOrderProductUseCase', () => {
  const mockFindByIdUserUseCase = {
    execute: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' }),
  } as unknown as jest.Mocked<FindByIdUserUseCase>;

  it('should create a OrderProduct', async () => {
    const request: CreateOrderProductUseCaseRequest = {
      orderId: 1,
      productId: 1,
      quantity: 1,
    };

    const ProductRepo = new InMemoryOrderProductRepository();
    const response = await createOrderProduct(
      request,
      mockFindByIdUserUseCase,
      ProductRepo,
    );

    expect(response.orderId).toEqual(request.orderId);
    expect(response.productId).toEqual(request.productId);
    expect(response.quantity).toEqual(request.quantity);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });
});
