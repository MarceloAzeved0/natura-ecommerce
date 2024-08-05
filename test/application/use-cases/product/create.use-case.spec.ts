import { InMemoryProductRepository } from '@/infra/database/in-memory/repositories/product/in-memory.product.repository';
import {
  CreateProductUseCase,
  CreateProductUseCaseRequest,
} from '@/application/use-cases/product/create.use-case';
import { Product } from '@prisma/client';

export async function createProduct(
  request: CreateProductUseCaseRequest,
  ProductRepo: InMemoryProductRepository,
): Promise<Product> {
  const createProductUseCase = new CreateProductUseCase(ProductRepo);

  const response = await createProductUseCase.execute(request);

  return response;
}

describe('CreateProductUseCase', () => {
  it('should create a Product', async () => {
    const request: CreateProductUseCaseRequest = {
      imageURL:
        'https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw9a0edf79/89834-89834_caminho_olfativo.jpg',
      price: 199.9,
      discount: 20,
      name: 'John Smith',
      description: 'desc product',
    };

    const ProductRepo = new InMemoryProductRepository();
    const response = await createProduct(request, ProductRepo);

    expect(response.name).toEqual(request.name);
    expect(response.price).toEqual(request.price);
    expect(response.discount).toEqual(request.discount);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });
});
