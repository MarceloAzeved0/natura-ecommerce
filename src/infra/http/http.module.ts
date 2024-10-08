import { UserController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { GetOrCreateUserUseCase } from '@/application/use-cases/user/get-or-create.use-case';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './controllers/product.controller';
import { CreateProductUseCase } from '@/application/use-cases/product/create.use-case';
import { FindAllProductUseCase } from '@/application/use-cases/product/findAll.use-case';
import { CreateOrderUseCase } from '@/application/use-cases/order/create.use-case';
import { OrderController } from './controllers/order.controller';
import { FindByIdUserUseCase } from '@/application/use-cases/user/findById.use-case';
import { CreateOrderProductUseCase } from '@/application/use-cases/order-product/create.use-case';
import { OrderProductController } from './controllers/order-product.controller';
import { ChangeQuantityOrderProductUseCase } from '@/application/use-cases/order-product/change-quantity.use-case';
import { FindByIdOrderUseCase } from '@/application/use-cases/order/findById.use-case';
import { FindByIdProductUseCase } from '@/application/use-cases/product/findById.use-case';
@Module({
  imports: [DatabaseModule],
  controllers: [
    UserController,
    ProductController,
    OrderController,
    OrderProductController,
  ],
  providers: [
    GetOrCreateUserUseCase,
    CreateProductUseCase,
    FindAllProductUseCase,
    CreateOrderUseCase,
    FindByIdUserUseCase,
    FindByIdOrderUseCase,
    FindByIdProductUseCase,
    CreateOrderProductUseCase,
    ChangeQuantityOrderProductUseCase,
  ],
})
export class HttpModule {}
