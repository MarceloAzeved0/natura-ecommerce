import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@/infra/http/http.module';
import flushDatabase from '@test/infra/utils/flush-database';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('OrderController (e2e)', () => {
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

  it('should return 200 when create order', async () => {
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

    return request(app.getHttpServer())
      .post('/order')
      .send({ userId: user.id, productIds: [{ id: product.id, quantity: 2 }] })
      .expect(HttpStatus.CREATED);
  });

  it('should return error when not found user', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send({ userId: 99 })
      .expect(HttpStatus.NOT_FOUND);
  });
});
