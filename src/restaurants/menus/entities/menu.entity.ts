import { ApiProperty } from '@nestjs/swagger';
import { ReservationMenu } from '@restaurants/entities/reservation-menu.entity';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: Number, example: 1 })
  @Column({ type: 'int' })
  restaurantId!: number;

  @ApiProperty({ type: String, example: 'main' })
  @IsNotEmpty({ message: '카테고리는 필수 값입니다.' })
  @IsString({ message: '메뉴 종류는 문자만 입력 가능합니다.' })
  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @ApiProperty({ type: String, example: 'Lunch 와인 페어링' })
  @IsNotEmpty({ message: '메뉴명은 필수 값입니다.' })
  @IsString({ message: '메뉴명은 문자만 입력 가능합니다.' })
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @ApiProperty({ type: Number, example: 100_000 })
  @IsNotEmpty({ message: '가격은 필수 값입니다.' })
  @IsInt({ message: '가격은 0이상의 정수만 가능합니다.' })
  @Min(0, { message: '가격은 0보다 작을 수 없습니다.' })
  @Column({ type: 'int', unsigned: true })
  price!: number;

  @ApiProperty({
    type: Number,
    example: '홍게살/아스파라거스/레몬, Sauvignon Blanc(소비뇽 블랑)',
  })
  @IsNotEmpty({ message: '설명을 비워둘 수 없습니다.' })
  @MinLength(2, { message: '설명은 최소 2자 이상 작성해주세요.' })
  @IsString({ message: '메뉴 설명은 문자만 입력 가능합니다.' })
  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    cascade: true,
  })
  restaurant!: Restaurant;

  @OneToMany(
    () => ReservationMenu,
    (reservationMenu) => reservationMenu.reservation,
  )
  reservationMenus!: ReservationMenu[];
}
