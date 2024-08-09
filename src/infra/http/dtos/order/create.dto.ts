import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

class IProductOrder {
  @ApiProperty()
  id: number;
  @ApiProperty()
  quantity: number;
}
export class CreateOrderDto {
  id: number;

  userId: number;

  discount: number;

  price: number;

  createdAt: Date;
  updatedAt?: Date;
}

export class CreateOrderDtoRequest {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: [IProductOrder] })
  productIds: IProductOrder[];
}
