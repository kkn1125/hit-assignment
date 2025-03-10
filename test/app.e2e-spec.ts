import { fakerKO as faker } from '@faker-js/faker';
import { LoggerService } from '@logger/logger.service';
import { ResponseInterceptor } from '@middleware/repsonse.interceptor';
import { INestApplication } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@users/enums/UserRole';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource, QueryRunner } from 'typeorm';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
        LoggerService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  // beforeEach(async () => {
  //   queryRunner = dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  // });

  // afterEach(async () => {
  //   await queryRunner.rollbackTransaction();
  //   await queryRunner.release();
  // });

  it('/version (GET)', async () => {
    // given
    const payload = {
      ok: true,
      status: 200,
      payload: '0.0.1',
      path: '/version',
      method: 'GET',
    };

    // when
    const result = await request(app.getHttpServer())
      .get('/version')
      .send()
      .expect(200);

    // then
    const { timestamp, ...data } = result.body;
    expect(data).toStrictEqual(payload);
  });

  it('sign up', async () => {
    // given
    const signupData = {
      userId: faker.internet.username({
        firstName: 'test',
        lastName: 'user',
      }),
      password: faker.internet.password({ length: 15 }),
      email: faker.internet.email({ provider: 'example.com' }),
      username: faker.person.fullName(),
      role: faker.helpers.objectValue(UserRole),
      phone: faker.phone.number(),
    };

    // when
    const signupResult = await request(app.getHttpServer())
      .post('/users')
      .send(signupData);

    // then
    expect(signupResult.status).toStrictEqual(201);

    // given
    const loginData = {
      userId: signupData.userId,
      password: signupData.password,
    };

    // when
    const loginResult = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    //then
    expect(loginResult.body.status).toStrictEqual(201);
    expect(loginResult.body.payload.token).toBeDefined();
    expect(loginResult.body.payload.refreshToken).toBeDefined();

    // given
    // when
    const getMe = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + loginResult.body.payload.token)
      .send();
  });
});
