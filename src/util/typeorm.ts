import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  RUN_MODE,
} from '@common/variables/environment';
import { Reservation } from '@reservations/entities/reservation.entity';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { User } from '@users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isDev = RUN_MODE === 'development';
const isTest = RUN_MODE === 'test';

export const typeormOption: DataSourceOptions = {
  type: 'mysql',
  synchronize: isTest || isDev,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User, Restaurant, Reservation],
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  logging: isTest || isDev ? ['query'] : ['error'],
  timezone: '+09:00',
  dropSchema: isTest,
};
export const typeormSource = new DataSource(typeormOption);
