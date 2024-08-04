import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderUseCase } from '@/application/use-cases/order/create.use-case';
import { Order } from '@prisma/client';
import { CreateOrderDto } from '../dtos/order/create.dto';
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
  async create(@Body() body: CreateOrderDto): Promise<CreateOrderDto> {
    const { userId } = body;

    const order = await this.createOrderUseCase.execute({
      userId: Number(userId),
    });

    return OrderMapper.toDto(order);
  }
}
