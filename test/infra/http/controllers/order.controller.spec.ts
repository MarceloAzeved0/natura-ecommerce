import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@/infra/http/http.module';

describe('OrderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 when create order', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send({ userId: 1 })
      .expect(HttpStatus.CREATED);
  });

  it('should return error when not found user', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send({ userId: 99 })
      .expect(HttpStatus.NOT_FOUND);
  });
});
