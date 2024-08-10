import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@/infra/http/http.module';
import flushDatabase from '@test/infra/utils/flush-database';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('OrderProductController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await flushDatabase();
  });

  it('should return 200 when create order product', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'test',
      },
    });

    const product = await prisma.product.create({
      data: {
        name: 'Teste product',
        description: 'string',
        price: 199,
        discount: 10,
        imageURL: 'string',
      },
    });

    const order = await prisma.order.create({
      data: {
        price: 189,
        discount: 10,
        userId: user.id,
      },
    });

    return request(app.getHttpServer())
      .post('/order-product')
      .send({ orderId: order.id, productId: product.id, quantity: 1 })
      .expect(HttpStatus.CREATED);
  });

  it('should return error when not found product', () => {
    return request(app.getHttpServer())
      .post('/order-product')
      .send({ orderId: 1, productId: -1, quantity: 3 })
      .expect(HttpStatus.NOT_FOUND);
  });
});
