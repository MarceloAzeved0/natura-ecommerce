import { Product } from '@/application/entities/product';
import { Product as PrismaProduct } from '@prisma/client';

export class PrismaProductMapper {
  private constructor() {
    throw new Error(
      'PrismaProductMapper is a static class and should not be instantiated',
    );
  }

  public static toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id,
      price: product.price,
      discount: product.discount,
      description: product.description,
      imageURL: product.imageURL,
      name: product.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  public static toDomain(productPrismaData: PrismaProduct) {
    return new Product({
      id: productPrismaData.id,
      price: productPrismaData.price,
      imageURL: productPrismaData.imageURL,
      name: productPrismaData.name,
      description: productPrismaData.description,
      discount: productPrismaData.discount,
      createdAt: productPrismaData.createdAt,
      updatedAt: productPrismaData.updatedAt,
    });
  }
}
