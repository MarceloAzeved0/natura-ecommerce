import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '../base/use-case.base';
import {
  ProductRepository,
  GetManyResponse,
} from '@/application/repositories/product.repository';

export interface FindAllProductUseCaseRequest {
  name?: string;
  description?: string;
  limit: number;
  offset: number;
}

export type FindAllProductUseCaseResponse = GetManyResponse;

@Injectable()
export class FindAllProductUseCase
  implements
    UseCaseBase<FindAllProductUseCaseRequest, FindAllProductUseCaseResponse>
{
  constructor(private readonly ProductRepository: ProductRepository) {}

  async execute(
    request: FindAllProductUseCaseRequest,
  ): Promise<FindAllProductUseCaseResponse> {
    const { name, description, limit, offset } = request;

    return this.ProductRepository.getMany({ name, description, limit, offset });
  }
}
