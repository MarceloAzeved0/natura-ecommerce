import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  userId: number;

  discount: number;

  price: number;

  createdAt: Date;
  updatedAt?: Date;
}
