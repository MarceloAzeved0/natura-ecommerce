import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class ChangeQuantityOrderProductDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  @Min(1)
  quantity: number;

  createdAt: Date;
  updatedAt?: Date;
}
