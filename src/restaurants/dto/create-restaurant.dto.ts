import { OmitType } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';

export class CreateRestaurantDto extends OmitType(Restaurant, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'user',
  'reservations',
  'menus',
]) {}
