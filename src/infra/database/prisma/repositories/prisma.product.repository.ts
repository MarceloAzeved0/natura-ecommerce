import { Injectable } from '@nestjs/common';
import { Product } from '@/application/entities/product';
import {
  ProductRepository,
  Pagination,
} from '@/application/repositories/product.repository';
import { PrismaService } from '../prisma.service';
import { PrismaProductMapper } from '../mappers/prisma.product.mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const productPrismaData = PrismaProductMapper.toPrisma(product);

    const data = await this.prismaService.product.create({
      data: productPrismaData,
    });

    return PrismaProductMapper.toDomain(data);
  }

  async getMany(filter: Partial<Product> & Pagination): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      skip: filter.offset,
      take: filter.limit,
      where: {
        OR: [
          {
            name: {
              contains: filter.name,
            },
          },
          {
            description: {
              contains: filter.description,
            },
          },
        ],
      },
    });

    return products.map(PrismaProductMapper.toDomain);
  }

  async getById(id: number): Promise<Product | undefined> {
    const data = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!data) {
      return;
    }

    return PrismaProductMapper.toDomain(data);
  }
}
