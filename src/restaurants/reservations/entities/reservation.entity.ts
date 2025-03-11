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

  @Column({ type: 'int', unique: true })
  userId!: number;

  @Column({ type: 'int', unique: true })
  restaurantId!: number;

  @Column({ type: 'datetime' })
  reserveStartAt!: Date;

  @Column({ type: 'datetime' })
  reserveEndAt!: Date;

  @Column({ type: 'varchar', length: 13 })
  phone!: string;

  @Column({ type: 'int', unique: true })
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
