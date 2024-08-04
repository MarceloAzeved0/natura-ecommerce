import { UserController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@/application/use-cases/user/create.use-case';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './controllers/product.controller';
import { CreateProductUseCase } from '@/application/use-cases/product/create.use-case';
import { FindAllProductUseCase } from '@/application/use-cases/product/findAll.use-case';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController, ProductController],
  providers: [CreateUserUseCase, CreateProductUseCase, FindAllProductUseCase],
})
export class HttpModule {}
