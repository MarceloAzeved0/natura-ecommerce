import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductUseCase } from '@/application/use-cases/product/create.use-case';
import { CreateProductDto } from '../dtos/product/create.dto';
import { ProductMapper } from '../mappers/product/mapper';
import { GetManyDto } from '../dtos/product/getMany.dto';
import { FindAllProductUseCase } from '@/application/use-cases/product/findAll.use-case';
import { Product } from '@prisma/client';

@Controller('Product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Product has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateProductDto): Promise<CreateProductDto> {
    const { name, description, price, discount, imageURL } = body;

    const product = await this.createProductUseCase.execute({
      name,
      description,
      price,
      discount,
      imageURL,
    });

    return ProductMapper.toDto(product);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Get the Products has been successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async findMany(@Query() query: GetManyDto): Promise<Product[]> {
    const { name, description, limit, offset } = query;

    const products = await this.findAllProductUseCase.execute({
      description,
      name,
      limit: Number(limit),
      offset: Number(offset),
    });

    return products;
  }
}
