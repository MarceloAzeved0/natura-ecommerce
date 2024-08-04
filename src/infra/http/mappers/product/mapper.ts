import { Product } from '@/application/entities/product';
import { CreateProductDto } from '../../dtos/product/create.dto';

export class ProductMapper {
  private constructor() {
    throw new Error(
      'ProductMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(product: Product): CreateProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      imageURL: product.imageURL,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
