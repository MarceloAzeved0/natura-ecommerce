import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderProductUseCase } from '@/application/use-cases/order-product/create.use-case';
import { CreateOrderProductDto } from '../dtos//order-product/create.dto';
import { OrderProductMapper } from '../mappers/order-product/mapper';
import { ChangeQuantityOrderProductUseCase } from '@/application/use-cases/order-product/change-quantity.use-case';
import { ChangeQuantityOrderProductDto } from '../dtos/order-product/change-quantity';

@Controller('order-product')
@ApiTags('order-product')
export class OrderProductController {
  constructor(
    private readonly createOrderProductUseCase: CreateOrderProductUseCase,
    private readonly changeQuantityOrderProductUseCase: ChangeQuantityOrderProductUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The orderProduct has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(
    @Body() body: CreateOrderProductDto,
  ): Promise<CreateOrderProductDto> {
    const { orderId, productId, quantity } = body;

    const orderProduct = await this.createOrderProductUseCase.execute({
      orderId: Number(orderId),
      productId: Number(productId),
      quantity: Number(quantity),
    });

    return OrderProductMapper.toDto(orderProduct);
  }

  @Patch()
  @ApiResponse({
    status: 201,
    description: 'The quantity has been successfully updated.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async changeQuanitity(
    @Body() body: ChangeQuantityOrderProductDto,
  ): Promise<CreateOrderProductDto> {
    const { id, quantity } = body;

    const orderProduct = await this.changeQuantityOrderProductUseCase.execute({
      id: Number(id),
      quantity: Number(quantity),
    });

    return OrderProductMapper.toDto(orderProduct);
  }
}
