import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import { Product } from '../../entities/product';
import { ProductRepository } from '@/application/repositories/product.repository';

export interface FindByIdProductUseCaseRequest {
  id: number;
}

export type FindByIdProductUseCaseResponse = Product;

@Injectable()
export class FindByIdProductUseCase
  implements
    UseCaseBase<FindByIdProductUseCaseRequest, FindByIdProductUseCaseResponse>
{
  constructor(private readonly ProductRepository: ProductRepository) {}

  async execute(
    request: FindByIdProductUseCaseRequest,
  ): Promise<FindByIdProductUseCaseResponse> {
    const { id } = request;

    return this.ProductRepository.getById(id);
  }
}
