import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpModule } from '@/infra/http/http.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 when create user', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'string',
        email: 'string',
      })
      .expect(HttpStatus.CREATED);
  });
});
