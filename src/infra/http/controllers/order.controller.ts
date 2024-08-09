import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderUseCase } from '@/application/use-cases/order/create.use-case';
import {
  CreateOrderDto,
  CreateOrderDtoRequest,
} from '../dtos/order/create.dto';
import { OrderMapper } from '../mappers/order/mapper';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateOrderDtoRequest): Promise<CreateOrderDto> {
    const { userId, productIds } = body;

    const order = await this.createOrderUseCase.execute({
      userId: Number(userId),
      productIds,
    });

    return OrderMapper.toDto(order);
  }
}
