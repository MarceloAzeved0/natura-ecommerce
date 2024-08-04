import { UserController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@/application/use-cases/user/create.use-case';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
