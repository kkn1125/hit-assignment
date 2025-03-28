import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  RUN_MODE,
} from '@common/variables/environment';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { ReservationMenu } from '@restaurants/reservations/entities/reservation-menu.entity';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';
import { User } from '@users/entities/user.entity';
import { Migration1741439368275 } from 'lib/1741439368275-migration';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isDev = RUN_MODE === 'development';
const isTest = RUN_MODE === 'test';

export const typeormOption: DataSourceOptions = {
  type: 'mariadb',
  synchronize: isTest,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [User, Restaurant, Reservation, Menu, ReservationMenu],
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  logging: isTest || isDev ? ['query', 'error'] : ['query', 'error'],
  migrations: [Migration1741439368275],
  timezone: '+00:00',
  dropSchema: isTest,
};
export const typeormSource = new DataSource(typeormOption);
