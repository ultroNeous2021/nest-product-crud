import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  const product_id = '2951572c-4ed7-412a-be29-2003eb86d638';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/product (GET) - Get all products', () => {
    return request(app.getHttpServer()).get('/product').expect(200);
  });

  it('/product/:id (GET) - Get a single product', () => {
    const productId = product_id;
    return request(app.getHttpServer())
      .get(`/product/${productId}`)
      .expect(200);
  });

  it('/product/:id (DELETE) - Delete a product', () => {
    const productId = product_id;
    return request(app.getHttpServer())
      .delete(`/product/${productId}`)
      .expect(200);
  });
});
