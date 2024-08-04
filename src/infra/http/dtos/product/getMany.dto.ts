import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetManyDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

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
