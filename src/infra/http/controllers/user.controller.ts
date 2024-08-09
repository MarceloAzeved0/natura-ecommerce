import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOrCreateUserUseCase } from '@/application/use-cases/user/get-or-create.use-case';
import { CreateUserDto } from '../dtos/user/create.dto';
import { UserMapper } from '../mappers/user/mapper';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly getOrCreateUserUseCase: GetOrCreateUserUseCase,
  ) {}

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

    const user = await this.getOrCreateUserUseCase.execute({
      name,
      email,
    });

    return UserMapper.toDto(user);
  }
}
