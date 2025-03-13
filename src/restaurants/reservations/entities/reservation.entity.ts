import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { User } from '@users/entities/user.entity';
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
export class Reservation {
  @ApiProperty({ type: Number, example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: Number, example: 1 })
  @Column({ type: 'int' })
  userId!: number;

  @ApiProperty({ type: Number, example: 1 })
  @Column({ type: 'int' })
  restaurantId!: number;

  @ApiProperty({ type: Date, example: '2025-03-13 13:00' })
  @Column({ type: 'datetime' })
  reserveStartAt!: Date;

  @ApiProperty({ type: Date, example: '2025-03-13 15:00' })
  @Column({ type: 'datetime' })
  reserveEndAt!: Date;

  @ApiProperty({ type: Date, example: '2025-03-13 15:00' })
  @Column({ type: 'varchar', length: 13 })
  phone!: string;

  @ApiProperty({ type: Date, example: 5 })
  @Column({ type: 'int', unsigned: true })
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.reservations, { cascade: true })
  user!: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
    cascade: true,
  })
  restaurant!: Restaurant;
}
