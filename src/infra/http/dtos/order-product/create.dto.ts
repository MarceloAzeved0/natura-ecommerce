import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderProductDto {
  id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  quantity: number;

  createdAt: Date;
  updatedAt?: Date;
}
