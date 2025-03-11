import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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
  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @ApiProperty({ type: String, example: 'Lunch 와인 페어링' })
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @ApiProperty({ type: Number, example: 100_000 })
  @Column({ type: 'int', unsigned: true })
  price!: number;

  @ApiProperty({
    type: Number,
    example: '홍게살/아스파라거스/레몬, Sauvignon Blanc(소비뇽 블랑)',
  })
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
}
