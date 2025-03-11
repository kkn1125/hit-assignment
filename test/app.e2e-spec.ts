import { fakerKO as faker } from '@faker-js/faker';
import { LoggerService } from '@logger/logger.service';
import { GlobalExceptionFilter } from '@middleware/global-exception.filter';
import { ResponseInterceptor } from '@middleware/repsonse.interceptor';
import { INestApplication } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@users/enums/UserRole';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource, QueryRunner } from 'typeorm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { Protocol } from '@util/protocol';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
        { provide: APP_FILTER, useClass: GlobalExceptionFilter },
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

  it('회원가입 중복 검증', async () => {
    // given
    const customerSignupData = {
      userId: 'totoro1',
      password: 'qweQQ!!1',
      email: 'totoro1@example.com',
      username: '토토로',
      role: UserRole.Customer,
      phone: '010-2345-4567',
    };
    const shopkeeperSignupData = {
      userId: 'totoro2',
      password: 'qweQQ!!1',
      email: 'totoro2@example.com',
      username: '토토로',
      role: UserRole.Customer,
      phone: '010-2345-4567',
    };

    // when
    const customerSignupResult = await request(app.getHttpServer())
      .post('/users')
      .send(customerSignupData);
    const shopkeeperSignupResult = await request(app.getHttpServer())
      .post('/users')
      .send(shopkeeperSignupData);

    // then
    expect(customerSignupResult.status).toStrictEqual(201);
    expect(shopkeeperSignupResult.status).toStrictEqual(409);
  });

  it('회원가입 - 로그인 - 정보 조회', async () => {
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
    expect(loginResult.body.payload.accessToken).toBeDefined();

    // given
    // when
    const getMe = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + loginResult.body.payload.accessToken);

    expect(getMe.body.payload.userId).toStrictEqual(loginData.userId);
  });

  it('토큰 없이 접근 처리', async () => {
    // given
    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .expect(401);

    // then
    expect(wrongAccess.body.message).toStrictEqual(
      Protocol.RequiredLogin.message,
    );
  });

  it('조작된 토큰 포맷 처리', async () => {
    // given
    const wrongFormatToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxLCJuYW1lIjoi6rmA6rK964KoIiwiZW1haWwiOiJjaGFwbGV0MDFAZ21haWwuY29tIiwicm9sZSI6MSwic3RhdHVzIjoxLCJsYXN0TG9naW5BdCI6bnVsbCwiaWF0IjoxNzQwMjM3MDQ2LCJleHAiOjE3NDAyMzc2NDYsImlzcyI6Im51dmlsYWIifQ.D1HzOPYlUHYDPM3__ibeQkzB96j6e6ZkR9aBYe2PNYo';

    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + wrongFormatToken)
      .expect(401);

    // then
    expect(wrongAccess.body.message).toStrictEqual(
      Protocol.JwtWrongSignature.message,
    );
  });

  it('토큰 만료 예외 처리', async () => {
    // given
    const wrongFormatToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdC51c2VyNjYiLCJlbWFpbCI6IjNkODNnNTNkZTNmczU2QGV4YW1wbGUuY29tIiwicm9sZSI6MiwiaWF0IjoxNzQxNTk3NjIzLCJleHAiOjE3NDE1OTc5MjMsImlzcyI6IkhpdFJlc3RhdXJhbnQifQ.qdPATuVSstJH3zzqZkYiz8cDAiiGizyLCdmNTeHt9RQ';

    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + wrongFormatToken)
      .expect(401);

    // then
    expect(wrongAccess.body.message).toStrictEqual(Protocol.JwtExpired.message);
  });

  it('조작된 토큰 처리', async () => {
    // given
    const wrongFormatToken = 'this is hack!';

    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', wrongFormatToken)
      .expect(401);

    // then
    expect(wrongAccess.body.message).toStrictEqual(
      Protocol.JwtMalFormed.message,
    );
  });

  it('고객 식당 접근 제어', async () => {
    // given
    const userData: CreateUserDto = {
      userId: 'testuser1',
      email: 'test1@example.com',
      username: '김이박',
      password: 'qweQQ!!1',
      role: UserRole.Customer,
      phone: '010-1234-5678',
    };

    // when
    const signup = await request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(201);
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userData)
      .expect(201);

    // then
    const accessToken = login.body.payload.accessToken;
    expect(accessToken).toBeDefined();

    // given
    const restaurantId = 1;
    const menuData = {};

    // when
    await request(app.getHttpServer())
      .post(`/restaurants/${restaurantId}/menus`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(menuData)
      .expect(401);
  });

  it('식당(점주) 예약 접근 제어', async () => {
    // given
    const customer: CreateUserDto = {
      userId: '푸파1',
      email: 'foodfigter1@example.com',
      username: '김유민',
      password: 'qweQQ!!1',
      role: UserRole.Customer,
      phone: '010-3210-6541',
    };
    const shopkeeper: CreateUserDto = {
      userId: '분위기는미슐랭',
      email: 'blueribbon1@example.com',
      username: '조홍섭',
      password: 'qweQQ!!1',
      role: UserRole.Shopkeeper,
      phone: '010-9876-1234',
    };

    // when
    await request(app.getHttpServer())
      .post('/users')
      .send(customer)
      .expect(201);

    const shopkeeperData = await request(app.getHttpServer())
      .post('/users')
      .send(shopkeeper)
      .expect(201);

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        userId: shopkeeper.userId,
        password: shopkeeper.password,
      })
      .expect(201);

    // then
    const accessToken = login.body.payload.accessToken;
    expect(accessToken).toBeDefined();

    // given
    const restaurantId = 1;
    const menuData = {};

    // when
    await request(app.getHttpServer())
      .post(`/restaurants/${restaurantId}/menus`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(menuData)
      .expect(401);
  });
});
