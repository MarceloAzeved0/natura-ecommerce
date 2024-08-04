import { UserController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '@/application/use-cases/user/create.use-case';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './controllers/product.controller';
import { CreateProductUseCase } from '@/application/use-cases/product/create.use-case';
import { FindAllProductUseCase } from '@/application/use-cases/product/findAll.use-case';
import { CreateOrderUseCase } from '@/application/use-cases/order/create.use-case';
import { OrderController } from './controllers/order.controller';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController, ProductController, OrderController],
  providers: [
    CreateUserUseCase,
    CreateProductUseCase,
    FindAllProductUseCase,
    CreateOrderUseCase,
    FindByIdUserUseCase,
  ],
})
export class HttpModule {}
