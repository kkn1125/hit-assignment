import { PickType } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { CreateMenuDto } from '@restaurants/menus/dto/create-menu.dto';

export class CreateRestaurantDto extends PickType(Restaurant, [
  'category',
  'name',
  'location',
]) {
  menu!: CreateMenuDto[];
}
