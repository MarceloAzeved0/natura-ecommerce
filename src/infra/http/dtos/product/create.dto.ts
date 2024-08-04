import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @ApiProperty()
  discount?: number;

  @IsNotEmpty()
  @ApiProperty()
  imageURL: string;

  createdAt: Date;
  updatedAt?: Date;
}
