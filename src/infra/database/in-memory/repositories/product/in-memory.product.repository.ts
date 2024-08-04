import { Product } from '@/application/entities/product';
import {
  ProductRepository,
  Filter,
} from '@/application/repositories/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  private productsMemory: Product[] = [];
  async create(product: Product): Promise<Product> {
    const response = new Product({
      price: product.price,
      name: product.name,
      description: product.description,
      discount: product.discount,
      imageURL: product.imageURL,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.productsMemory.push(response);

    return response;
  }

  async getMany(filter: Filter): Promise<Product[]> {
    this.productsMemory.find(
      (prod) =>
        prod.description === filter.description || prod.name === filter.name,
    );

    return;
  }
}
