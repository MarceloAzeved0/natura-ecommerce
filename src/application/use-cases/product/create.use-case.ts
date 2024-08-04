import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { Product } from '../../entities/product';
import { ProductRepository } from '@/application/repositories/product.repository';

export interface CreateProductUseCaseRequest {
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageURL: string;
}

export type CreateProductUseCaseResponse = Product;

@Injectable()
export class CreateProductUseCase
  implements
    UseCaseBase<CreateProductUseCaseRequest, CreateProductUseCaseResponse>
{
  constructor(private readonly ProductRepository: ProductRepository) {}

  async execute(
    request: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
    const { name, price, description, discount, imageURL } = request;

    const product = new Product({
      name,
      price,
      discount,
      imageURL,
      description,
    });

    return this.ProductRepository.create(product);
  }
}
