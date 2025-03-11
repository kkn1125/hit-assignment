import { OmitType } from '@nestjs/swagger';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto extends OmitType(Menu, [
  'id',
  'restaurantId',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'restaurant',
]) {}

/* 
export class CreateMenuDto {
  @ApiProperty({ type: String, example: 'main' })
  category!: string;

  @ApiProperty({ type: String, example: 'Lunch 와인 페어링' })
  name!: string;

  @ApiProperty({ type: Number, example: 10_000 })
  price!: number;

  @ApiProperty({
    type: String,
    example: '홍게살/아스파라거스/레몬, Sauvignon Blanc(소비뇽 블랑)',
  })
  description!: string;
}
*/
