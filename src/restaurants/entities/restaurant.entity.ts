import { Menu } from '@restaurants/menus/entities/menu.entity';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';
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

  @Column({ type: 'int', unique: true })
  userId!: number;

  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 200 })
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

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus!: Menu[];
}
