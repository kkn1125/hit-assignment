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

  @Column({ type: 'int', unsigned: true })
  restaurantId!: number;

  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'int', unsigned: true })
  price!: number;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
  restaurant!: Restaurant;
}
