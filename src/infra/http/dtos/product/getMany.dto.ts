import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { CreateProductDto } from './create.dto';

export class GetManyDtoResponse {
  total: number;
  products: CreateProductDto[];
}

export class GetManyDto {
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(3)
  @Transform(({ value }) => Number(value))
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => Number(value))
  offset: number;
}
