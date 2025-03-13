import { PickType } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';

export class CreateRestaurantDto extends PickType(Restaurant, [
  'category',
  'name',
  'location',
]) {}
