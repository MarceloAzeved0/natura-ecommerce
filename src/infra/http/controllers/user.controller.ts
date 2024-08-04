import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '@/application/use-cases/user/create.use-case';
import { CreateUserDto } from '../dtos/user/create.dto';
import { UserMapper } from '../mappers/user/mapper';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    const { name, email } = body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
    });

    return UserMapper.toDto(user);
  }
}
