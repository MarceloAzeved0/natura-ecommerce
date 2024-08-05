import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@/infra/http/http.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 when create product', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'Teste product',
        description: 'string',
        price: 0,
        discount: 0,
        imageURL: 'string',
      })
      .expect(HttpStatus.CREATED);
  });

  it('should return products list', () => {
    return request(app.getHttpServer())
      .get('/product')
      .query({
        name: 'Teste',
        description: 'string',
        limit: 10,
        offset: 0,
      })
      .expect(HttpStatus.OK);
  });
});
