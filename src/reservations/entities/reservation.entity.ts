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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  restaurantId!: number;

  @Column()
  reserveStartAt!: Date;

  @Column()
  reserveEndAt!: Date;

  @Column()
  phone!: string;

  @Column()
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  user!: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations)
  restaurant!: Restaurant;
}
