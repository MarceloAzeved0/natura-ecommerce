import { InMemoryProductRepository } from '@/infra/database/in-memory/repositories/product/in-memory.product.repository';
import { FindAllProductUseCase } from '@/application/use-cases/product/findAll.use-case';
import { createProduct } from '@test/application/use-cases/product/create.use-case.spec';
import { CreateProductUseCaseRequest } from '../../../../src/application/use-cases/product/create.use-case';

describe('FindAllProductUseCase', () => {
  it('find products with params', async () => {
    const ProductRepo = new InMemoryProductRepository();

    const request: CreateProductUseCaseRequest = {
      imageURL:
        'https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw9a0edf79/89834-89834_caminho_olfativo.jpg',
      price: 199.9,
      discount: 20,
      name: 'John Smith',
      description: 'desc product',
    };
    const createProductUseCase = await createProduct(request, ProductRepo);

    expect(createProductUseCase.name).toBe(request.name);

    const findAllProductUseCase = new FindAllProductUseCase(ProductRepo);

    const filterParams = {
      description: 'desc',
      name: 'John',
      limit: 10,
      offset: 0,
    };

    const response = await findAllProductUseCase.execute(filterParams);

    console.log(response);

    expect(response.length).toBeGreaterThanOrEqual(1);
    expect(response[0].description).toContain(filterParams.description);
    expect(response[0].name).toContain(filterParams.name);
  });

  it('find products only description filter', async () => {
    const ProductRepo = new InMemoryProductRepository();

    const request: CreateProductUseCaseRequest = {
      imageURL:
        'https://production.na01.natura.com/on/demandware.static/-/Sites-NatBrazil-Library/default/dw9a0edf79/89834-89834_caminho_olfativo.jpg',
      price: 199.9,
      discount: 20,
      name: 'John Smith',
      description: 'desc product',
    };
    const createProductUseCase = await createProduct(request, ProductRepo);

    expect(createProductUseCase.name).toBe(request.name);

    const findAllProductUseCase = new FindAllProductUseCase(ProductRepo);

    const filterParams = {
      description: 'desc',
      name: '',
      limit: 10,
      offset: 0,
    };

    const response = await findAllProductUseCase.execute(filterParams);

    console.log(response);

    expect(response.length).toBeGreaterThanOrEqual(1);
    expect(response[0].description).toContain(filterParams.description);
  });
});
