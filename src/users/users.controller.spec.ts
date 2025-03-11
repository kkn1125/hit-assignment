import { fakerKO as faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '../util/enums/UserRole';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUsersService = {
  create: vitest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be signed up', async () => {
    const userData: CreateUserDto = {
      userId: faker.internet.username(),
      username: faker.person.fullName(),
      email: faker.internet.email({ provider: 'example.com' }),
      password: faker.internet.password({ length: 15 }),
      role: faker.helpers.objectValue(UserRole),
      phone: faker.phone.number(),
    };
    const successResponse: any = {
      ok: true,
      status: 201,
      payload: { id: 1 },
      path: '/api/users',
      method: 'post',
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
    };

    const createSpy = vitest.spyOn(service, 'create');
    createSpy.mockResolvedValueOnce(successResponse);

    const result = await controller.create(userData);
    expect(result).toStrictEqual(successResponse);
  });
});
