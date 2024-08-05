import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

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

  @ApiProperty({ description: 'The quantity of the item', minimum: 1 })
  @IsNotEmpty({ message: 'Quantity should not be empty' })
  @IsInt({ message: 'Quantity should be an integer' })
  @Min(1, { message: 'Quantity should be at least 1' })
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;

  createdAt: Date;
  updatedAt?: Date;
}
