import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@/infra/http/http.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 when create order product', () => {
    return request(app.getHttpServer())
      .post('/order-product')
      .send({ orderId: 1, productId: 2, quantity: 3 })
      .expect(HttpStatus.CREATED);
  });

  it('should return error when not found product', () => {
    return request(app.getHttpServer())
      .post('/order-product')
      .send({ orderId: 1, productId: -1, quantity: 3 })
      .expect(HttpStatus.NOT_FOUND);
  });
});
