import { fakerKO as faker } from '@faker-js/faker';
import { LoggerService } from '@logger/logger.service';
import { GlobalExceptionFilter } from '@middleware/global-exception.filter';
import { ResponseInterceptor } from '@middleware/repsonse.interceptor';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRestaurantDto } from '@restaurants/dto/create-restaurant.dto';
import { CreateMenuDto } from '@restaurants/menus/dto/create-menu.dto';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserRole } from '@util/enums/UserRole';
import { Protocol } from '@util/protocol';
import request from 'supertest';
import { App } from 'supertest/types';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from './../src/app.module';
import dayjs from 'dayjs';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('/version (GET)', async () => {
    // given
    const payload = {
      ok: true,
      status: HttpStatus.OK,
      payload: { version: '0.0.1' },
      path: '/version',
      method: 'GET',
    };

    // when
    const result = await request(app.getHttpServer())
      .get('/version')
      .send()
      .expect(HttpStatus.OK);

    // then
    const { timestamp, ...data } = result.body;
    expect(data).toStrictEqual(payload);
  });

  it('/restaurants/1/menus (POST)', async () => {
    // given
    const shopkeeperData: CreateUserDto = {
      userId: '블루리본1',
      email: 'devdot@example.com',
      phone: '010-8080-1234',
      username: '유규민',
      password: 'qweQQ!!1',
      role: UserRole.Shopkeeper,
    };

    // when
    const signupResult = await request(app.getHttpServer())
      .post('/users')
      .send(shopkeeperData);

    // then
    expect(signupResult.status).toStrictEqual(HttpStatus.CREATED);

    // given
    const loginData = {
      userId: shopkeeperData.userId,
      password: shopkeeperData.password,
    };

    // when
    const loginResult = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData);

    // then
    expect(loginResult.body.status).toStrictEqual(HttpStatus.CREATED);

    // given
    const accessToken = loginResult.body.payload.accessToken;
    const restaurantData: CreateRestaurantDto = {
      category: 'fine dining',
      name: '류니끄',
      location: '서울시 강남구 도산대로00길 0-0',
    };

    // when
    const createRestaurantResult = await request(app.getHttpServer())
      .post('/restaurants')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(restaurantData);

    // then
    expect(createRestaurantResult.status).toStrictEqual(HttpStatus.CREATED);

    // given
    const menusData: CreateMenuDto[] = [
      {
        category: 'main',
        name: 'Lunch 와인 페어링',
        price: 10_000,
        description: '홍게살/아스파라거스/레몬, Sauvignon Blanc(소비뇽 블랑)',
      },
    ];

    // when
    const createMuneResult = await request(app.getHttpServer())
      .post('/restaurants/1/menus')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(menusData);

    // then
    const status = createMuneResult.status;
    const payload = createMuneResult.body.payload;
    expect(status).toStrictEqual(HttpStatus.CREATED);
    expect(payload).toStrictEqual([{ id: 1 }]);
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
    const customerStatus = customerSignupResult.status;
    const shopkeeperStatus = shopkeeperSignupResult.status;
    expect(customerStatus).toStrictEqual(HttpStatus.CREATED);
    expect(shopkeeperStatus).toStrictEqual(HttpStatus.CONFLICT);
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
    expect(signupResult.status).toStrictEqual(HttpStatus.CREATED);

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
    const status = loginResult.body.status;
    const accessToken = loginResult.body.payload.accessToken;
    expect(status).toStrictEqual(HttpStatus.CREATED);
    expect(accessToken).toBeDefined();

    // given
    // when
    const getMe = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + loginResult.body.payload.accessToken);

    const userId = getMe.body.payload.userId;
    expect(userId).toStrictEqual(loginData.userId);
  });

  it('토큰 없이 접근 처리', async () => {
    // given
    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .expect(HttpStatus.UNAUTHORIZED);

    // then
    const message = wrongAccess.body.message;
    expect(message).toStrictEqual(Protocol.RequiredLogin.message);
  });

  it('조작된 토큰 포맷 처리', async () => {
    // given
    const wrongFormatToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxLCJuYW1lIjoi6rmA6rK964KoIiwiZW1haWwiOiJjaGFwbGV0MDFAZ21haWwuY29tIiwicm9sZSI6MSwic3RhdHVzIjoxLCJsYXN0TG9naW5BdCI6bnVsbCwiaWF0IjoxNzQwMjM3MDQ2LCJleHAiOjE3NDAyMzc2NDYsImlzcyI6Im51dmlsYWIifQ.D1HzOPYlUHYDPM3__ibeQkzB96j6e6ZkR9aBYe2PNYo';

    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + wrongFormatToken)
      .expect(HttpStatus.UNAUTHORIZED);

    // then
    const message = wrongAccess.body.message;
    expect(message).toStrictEqual(Protocol.JwtWrongSignature.message);
  });

  it('토큰 만료 예외 처리', async () => {
    // given
    const wrongFormatToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcklkIjoidGVzdF91c2VyMTYiLCJlbWFpbCI6IjNkODNnNTNkZTNmeV8zY3czZzUzaHpAZXhhbXBsZS5jb20iLCJyb2xlIjoyLCJwaG9uZSI6IjAyMS0zOTU3LTMxMzYiLCJpYXQiOjE3NDIwNDgyNjAsImV4cCI6MTc0MjA0ODU2MCwiaXNzIjoiSGl0UmVzdGF1cmFudCJ9.MOw-3WUkadYLicaCNzdaQnSIhyIICRJNvPL4oX9SA98';

    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', 'Bearer ' + wrongFormatToken)
      .expect(HttpStatus.UNAUTHORIZED);

    // then
    const message = wrongAccess.body.message;
    expect(message).toStrictEqual(Protocol.JwtExpired.message);
  });

  it('조작된 토큰 처리', async () => {
    // given
    const wrongFormatToken = 'this is hack!';

    // when
    const wrongAccess = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', wrongFormatToken)
      .expect(HttpStatus.UNAUTHORIZED);

    // then
    const message = wrongAccess.body.message;
    expect(message).toStrictEqual(Protocol.JwtMalFormed.message);
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
      .expect(HttpStatus.CREATED);

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userData)
      .expect(HttpStatus.CREATED);

    // then
    const accessToken = login.body.payload.accessToken;
    expect(signup.body.status).toStrictEqual(HttpStatus.CREATED);
    expect(accessToken).toBeDefined();
    console.log(accessToken);
    // given
    const restaurantId = 1;
    const menuData = {};

    // when
    await request(app.getHttpServer())
      .post(`/restaurants/${restaurantId}/menus`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(menuData)
      .expect(HttpStatus.UNAUTHORIZED);

    // given
    const startAt = dayjs().add(1, 'd').set('m', 30).set('s', 0).set('ms', 0);
    const endAt = dayjs()
      .add(1, 'd')
      .add(1, 'h')
      .set('m', 30)
      .set('s', 0)
      .set('ms', 0);
    const reservationData = {
      reserveStartAt: startAt,
      reserveEndAt: endAt,
      phone: '010-2234-5678',
      amount: 5,
      menu: [1],
    };
    const isAnotherDay = !dayjs(endAt).isSame(startAt, 'd');

    // when
    const reservationResult = await request(app.getHttpServer())
      .post(`/restaurants/${restaurantId}/reservations`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(reservationData)
      .expect(isAnotherDay ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED);

    if (!isAnotherDay) {
      // then
      expect(reservationResult.body.payload.id).toStrictEqual(1);
    }
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
      .expect(HttpStatus.CREATED);

    await request(app.getHttpServer())
      .post('/users')
      .send(shopkeeper)
      .expect(HttpStatus.CREATED);

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        userId: shopkeeper.userId,
        password: shopkeeper.password,
      })
      .expect(HttpStatus.CREATED);

    // then
    const accessToken = login.body.payload.accessToken;
    expect(accessToken).toBeDefined();

    // given
    const restaurantId = 1;
    const menuData = {}; // emptyBody

    // when
    const accessDeniedResult = await request(app.getHttpServer())
      .post(`/restaurants/${restaurantId}/menus`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(menuData)
      .expect(HttpStatus.BAD_REQUEST);

    const message = accessDeniedResult.body.message;
    expect(message).toStrictEqual(Protocol.NoMatchOwnRestaurant.message);
  });
});
