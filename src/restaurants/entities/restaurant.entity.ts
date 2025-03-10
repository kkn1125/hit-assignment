import { Reservation } from '@reservations/entities/reservation.entity';
import { User } from '@users/entities/user.entity';
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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  storeName!: string;

  @Column()
  location!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.restaurants, { cascade: true })
  user!: User;

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations!: Reservation[];
}
