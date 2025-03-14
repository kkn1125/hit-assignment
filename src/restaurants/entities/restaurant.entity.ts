import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';
import { User } from '@users/entities/user.entity';
import { IsString, MaxLength, MinLength } from 'class-validator';
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
export class Restaurant {
  @ApiProperty({ type: Number, example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: Number, example: 1 })
  @Column({ type: 'int' })
  userId!: number;

  @ApiProperty({ type: String, example: 'chinese cuisine' })
  @IsString({ message: '식당 유형은 문자만 가능합니다.' })
  @MinLength(1, { message: '식당 유형은 1자 이상이어야 합니다.' })
  @MaxLength(50, { message: '식당 유형은 50자 이내여야 합니다.' })
  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @ApiProperty({ type: String, example: '자금성' })
  @IsString({ message: '식당 이름은 문자만 가능합니다.' })
  @MinLength(1, { message: '식당 이름은 1자 이상이어야 합니다.' })
  @MaxLength(50, { message: '식당 이름은 50자 이내여야 합니다.' })
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @ApiProperty({ type: String, example: '서울시 00구 00동 000-0' })
  @IsString({ message: '주소지는 문자만 가능합니다.' })
  @MinLength(1, { message: '주소지는 1자 이상이어야 합니다.' })
  @MaxLength(200, { message: '주소지는 200자 이내여야 합니다.' })
  @Column({ type: 'varchar', length: 200 })
  location!: string;

  @ApiProperty({ type: String, example: '2025-03-11 14:51:15' })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ type: String, example: '2025-03-11 14:51:15' })
  @UpdateDateColumn()
  updatedAt!: Date;

  @ApiProperty({ type: String, example: null })
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.restaurants, { cascade: true })
  user!: User;

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations!: Reservation[];

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus!: Menu[];
}
