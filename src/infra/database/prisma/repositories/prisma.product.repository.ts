import { Injectable } from '@nestjs/common';
import { Product } from '@/application/entities/product';
import {
  ProductRepository,
  GetManyResponse,
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

  async getMany(
    filter: Partial<Product> & Pagination,
  ): Promise<GetManyResponse> {
    let where = {};
    const filters = [];

    if (filter.name) {
      filters.push({
        name: {
          contains: filter.name,
          mode: 'insensitive',
        },
      });
    }

    if (filter.description) {
      filters.push({
        description: {
          contains: filter.description,
          mode: 'insensitive',
        },
      });
    }

    if (filters.length > 0) {
      where = {
        OR: filters,
      };
    }

    const products = await this.prismaService.product.findMany({
      skip: filter.offset,
      take: filter.limit,
      orderBy: {
        createdAt: 'asc',
      },
      where,
    });

    const count = await this.prismaService.product.count({ where });

    return {
      products: products.map(PrismaProductMapper.toDomain),
      total: count,
    };
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
